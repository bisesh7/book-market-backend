export const required = (value) => (value ? undefined : "Required");

// const maxLength = (max) => (value) =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined;

// export const maxLength10 = maxLength(10);

export const length10 = (value) =>
  value && value.length !== 10 ? `Must be 10 characters` : undefined;

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength8 = minLength(8);

export const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const oneNumber = (value) =>
  !/[0-9]/i.test(value) ? "Should contain at least 1 number" : null;

export const oneSpecialCharacter = (value) =>
  !/[!@#$%^&*]/i.test(value)
    ? "Should contain at least 1 special character"
    : null;

export const oneLowercase = (value) =>
  !/[a-z]/.test(value) ? "Should contail at least 1 lowercase letter" : null;

export const oneUppercase = (value) =>
  !/[A-Z]/.test(value) ? "Should contail at least 1 uppercase letter" : null;
