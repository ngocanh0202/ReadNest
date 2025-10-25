interface ValidationRule {
    rule: string;
    message: string;
}

declare global {
    interface Window {
        setDynamicRules: (fieldId: string, rules: ValidationRule[]) => void;
        checkDynamicRules: (fieldId: string, value: string) => boolean;
        setValidationMessage: (fieldId: string, message: string) => void;
        focusFirstInvalidField: () => void;
    }
}

const dynamicRules: Record<string, ValidationRule[]> = {};

function setDynamicRules(fieldId: string, rules: ValidationRule[]): void {
    dynamicRules[fieldId] = rules;
}

function checkDynamicRules(fieldId: string, _value: string): boolean {
    const value = _value;
    const rules = dynamicRules[fieldId];
    
    if (!rules || rules.length === 0) {
        return true;
    }

    for (let i = 0; i < rules.length; i++) {
        const r = rules[i];
        try {
            const ruleFunction = new Function('value', `return Boolean(${r.rule});`);
            const result = ruleFunction(value);

            if (result === true) {
                setValidationMessage(fieldId, r.message);
                return false; 
            }
        } catch (error) {
            console.error(`Error evaluating rule for ${fieldId}:`, error);
            setValidationMessage(fieldId, "Validation error occurred");
            return false;  
        }
    }

    setValidationMessage(fieldId, "");
    return true; 
}

function setValidationMessage(fieldId: string, message: string): void {
    const el = document.querySelector(
        `.validation-message[for="${fieldId}"]`
    ) as HTMLElement | null;
    const fieldInput = document.getElementById(fieldId) as HTMLInputElement;

    if (el) {
        if (message) {
            el.style.display = "block"
            if (fieldInput) {
                fieldInput.classList.add("invalid")
                fieldInput.classList.remove("valid")
            }
        }
        else {
            el.style.display = "none"
            if (fieldInput) {
                fieldInput.classList.add("valid")
                fieldInput.classList.remove("invalid")
            }
        }

        el.textContent = message;
    }
}

function focusFirstInvalidField() {
    const firstInvalidInput = document.querySelector('input.invalid, textarea.invalid, select.invalid') as HTMLInputElement;

    if (firstInvalidInput) {
        firstInvalidInput.focus();
    } else {
        const firstValidationMessage = document.querySelector('.validation-message[style*="display: block"]');
        if (firstValidationMessage) {
            firstValidationMessage.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}

window.setDynamicRules = setDynamicRules;
window.checkDynamicRules = checkDynamicRules;
window.setValidationMessage = setValidationMessage;
window.focusFirstInvalidField = focusFirstInvalidField;