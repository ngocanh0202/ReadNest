using ReadNest_Enums;

namespace ReadNest_BE.Utils
{
	public class Utils
	{
        public static string HashKey(string input)
        {
            using var sha = System.Security.Cryptography.SHA256.Create();
            var bytes = sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(input));
            return Convert.ToHexString(bytes).Substring(0, 20).ToLower();
        }
        public static string GenerateFieldUpdateBy(string updateBy, string userId)
		{
			if (string.IsNullOrEmpty(updateBy))
				return userId;

            string[] updateBys = updateBy.Split(';', StringSplitOptions.RemoveEmptyEntries);
			if (updateBys.Length == 0)
			{
				return userId;
			}
			else
			{
				var updateByList = updateBys.ToList();
				if (!updateByList.Contains(userId))
				{
					updateByList.Add(userId);
				}
				return string.Join(';', updateByList);
			}
		}
		public static bool CheckIdInUpdateByAndCreateBy(string createBy, string updateBy, string userId)
		{
			if (createBy == null)
				return false;
			if (createBy.Equals(userId))
				return true;
			if (updateBy == null)
				return false;
            string[] updateBys = updateBy.Split(';', StringSplitOptions.RemoveEmptyEntries);
            if (updateBys.Length == 0)
            {
                return false;
            }
			return updateBys.Any(p => p.Equals(userId));
        }
		public static bool IsRole(string roles, RoleType roleType)
		{
			if (string.IsNullOrEmpty(roles))
				return false;

			var roleList = roles.Split(';').ToList();
			return roleList.Any(r => r.Equals(roleType.ToString()));
        }
    }
}