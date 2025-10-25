using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadNest_BE.Exceptions;
using ReadNest_BE.Interfaces.Repositories;
using ReadNest_BE.Services;
using ReadNest_Enums;
using ReadNest_Models;
using static Dapper.SqlMapper;

namespace ReadNest_BE.Controllers
{
    [ApiController]
    [Authorize]
    public class BaseController<T> : ControllerBase where T : BaseModel, ExtendModel
    {
        protected readonly IRepository<T> _repository;
        protected readonly JwtService _jwtService;
        public BaseController(IRepository<T> repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Get([FromQuery] string? keyword, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            if (!CanRead(out var errorMessage))
                return Unauthorized(errorMessage);
            try
            {
                string header = Request.Headers["Authorization"].ToString();
                _jwtService.Token = header;
                var entites = await _repository.GetAll();
                entites = entites.Where(e =>
                {
                    var valueName = e.GetType().GetProperty("Name")?.GetValue(e)?.ToString();
                    var valueP = e.GetType().GetProperty("P")?.GetValue(e)?.ToString();
                    return string.IsNullOrEmpty(keyword) ||
                           (!string.IsNullOrEmpty(valueName) && valueName.Contains(keyword, StringComparison.OrdinalIgnoreCase)) ||
                           (!string.IsNullOrEmpty(valueP) && valueP.Contains(keyword, StringComparison.OrdinalIgnoreCase));
                }).ToList();

                int totalRow = entites.Count();
                pageSize = pageSize < 1 ? 5 : pageSize;
                int pageCount = (int)Math.Ceiling(totalRow / (double)pageSize);
                if (page > pageCount)
                    page = pageCount;
                else if (page < 1)
                    page = 1;

                entites = entites.Skip((page - 1) * pageSize).Take(pageSize).ToList();

                var paginationData = new PaginationData<List<T>>(entites, page, pageSize, totalRow);
                return Ok(new Response<PaginationData<List<T>>>(paginationData, $"Get list of {typeof(T).Name} successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> Get(string id)
        {
            if(!CanRead(out var errorMessage))
                return Unauthorized(errorMessage);
            try
            {
                if (string.IsNullOrEmpty(id))
                    return BadRequest("Id is required");
                var entity = await _repository.GetById(id);
                return Ok(new Response<T>(entity, $"Get {typeof(T).Name} successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] T value)
        {
            if (!IsAuthorized(null!, true , out var errorMessage, out var userId))
                return Unauthorized(errorMessage);
            try
            {
                var updatedEntity = PrepareEntityForCreate(value, userId);
                var result = await _repository.Create(updatedEntity);
                return Ok(new Response<T>(result, $"{typeof(T).Name} created successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public virtual async Task<IActionResult> Put([FromBody] T value)
        {
            var entity = await _repository.GetById(value.Id);
            if (entity == null)
                return NotFound($"{typeof(T).Name} not found");
            if (!IsAuthorized(entity, false ,out var errorMessage, out var userId))
                return Unauthorized(errorMessage);
            try
            {
                var updatedEntity = PrepareEntityForUpdate(value, entity, userId);
                var result = await _repository.Update(updatedEntity);
                return Ok(new Response<T>(result, $"{typeof(T).Name} updated successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(string id)
        {
            var entity = await _repository.GetById(id);
            if (entity == null)
                return NotFound($"{typeof(T).Name} not found");

            if (!IsAuthorized(entity, false, out var errorMessage, out var userId))
                return Unauthorized(errorMessage);

            try
            {
                var result = await _repository.Delete(entity);
                if (!result)
                    return BadRequest("Delete Failed");
                return Ok(new Response<bool>(result, $"{typeof(T).Name} deleted successfully", true));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected T PrepareEntityForCreate(T newValue, string userId)
        {
            newValue.Id = Guid.NewGuid().ToString();
            newValue.CreateBy = userId;
            newValue.CreateDate = DateTime.UtcNow;
            newValue.UpdateBy = userId;
            newValue.UpdateDate = DateTime.UtcNow;
            return newValue;
        }

        protected T PrepareEntityForUpdate(T newValue, T existingEntity, string userId)
        {
            newValue.CreateBy = existingEntity.CreateBy;
            newValue.CreateDate = existingEntity.CreateDate;
            newValue.UpdateBy = Utils.Utils.GenerateFieldUpdateBy(existingEntity.UpdateBy!, userId);
            newValue.UpdateDate = DateTime.UtcNow;
            return newValue;
        }

        protected bool CanRead(out string errorMessage)
        {
            errorMessage = string.Empty;
            try
            {
                SetJwtToken();
                string roles = _jwtService.GetRoleFromToken() ?? "";

                bool isAdmin = Utils.Utils.IsRole(roles, RoleType.ADMIN);
                bool isAuthor = Utils.Utils.IsRole(roles, RoleType.AUTHOR);
                bool isReader = Utils.Utils.IsRole(roles, RoleType.READER);

                if (isAdmin || isAuthor || isReader)
                    return true;

                errorMessage = "You do not have permission to read this resource.";
                return false;
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }
        }

        protected bool IsAuthorized(T entity, bool isCreateOperation, out string errorMessage, out string userId)
        {
            errorMessage = string.Empty;
            try
            {
                string Id = GetUserIdFromToken();
                string roles = _jwtService.GetRoleFromToken()!;
                userId = Id;
                bool isAdmin = Utils.Utils.IsRole(roles, RoleType.ADMIN);
                bool isAuthor = Utils.Utils.IsRole(roles, RoleType.AUTHOR);

                if (isAdmin)
                    return true;

                if (isCreateOperation)
                {
                    if (isAuthor)
                        return true;

                    errorMessage = $"You don't have permission to create {GetEntityName()}";
                    return false;
                }

                if (entity is null)
                    return false;

                bool hasPermission = Utils.Utils.CheckIdInUpdateByAndCreateBy(
                    entity.CreateBy!,
                    entity.UpdateBy!,
                    Id
                );

                if (hasPermission && isAuthor)
                    return true;

                if (!hasPermission)
                {
                    errorMessage = $"You don't have permission to modify {GetEntityName()} with Id {entity.Id}";
                    return false;
                }

                errorMessage = $"You don't have sufficient role to perform this action";
                return false;
            }
            catch (ForbiddenException ex)
            {
                errorMessage = ex.Message;
                userId = string.Empty;
                return false;
            }
        }
        protected void SetJwtToken()
        {
            string authHeader = Request.Headers["Authorization"].ToString();
            _jwtService.Token = authHeader;
        }

        protected string GetEntityName() => nameof(T).ToLower();

        protected string GetUserIdFromToken()
        {
            SetJwtToken();
            return _jwtService.GetUserIdFromToken()!;
        }
    }
}
