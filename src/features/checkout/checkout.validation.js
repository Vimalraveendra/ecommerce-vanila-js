import {
  requiredAddressFields,
  requiredCardFields,
} from "./checkout.config.js";

export const setError = (el, errEl, message, isInvalid) => {
  el.classList.toggle("form-input--error", isInvalid);
  errEl.textContent = isInvalid ? message : "";
  return isInvalid;
};

export function validateFormFields(requiredFieldsData, method = "any") {
  let valid = true;
  requiredFieldsData.forEach(({ id, errId, message, validate }) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById(errId);
    const value = el.value.trim();
    const isInValid = method === "card" ? !validate(value) : value === "";
    const result = setError(el, errEl, `${message} required`, isInValid);
    if (result) valid = false;
  });
  return valid;
}

export function validatePayment(method) {
  return validateFormFields(requiredCardFields, method);
}

export function validateAddress() {
  return validateFormFields(requiredAddressFields);
}
