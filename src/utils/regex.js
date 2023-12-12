export const usernameRegex = {
  value: /^[a-zA-Z][a-zA-Z0-9]{4,11}$/g,
  message: "Username must be 5-12 characters long and start with a letter.",
};
export const passwordRegex = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
  message:
    "Password must be 8 characters long, contain at least one uppercase letter, one lowercase letter and one number.",
};
