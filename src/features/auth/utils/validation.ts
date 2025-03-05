/* eslint-disable no-useless-escape */
export const validateLoginForm = (email: string, password: string) => {
  const errors: Record<string, string> = {};

  // Validasi email
  if (!email.trim()) {
    errors.email = "Email wajib diisi";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Format email tidak valid";
  }

  // Validasi password
  if (!password.trim()) {
    errors.password = "Password wajib diisi";
  } else if (password.length < 6) {
    errors.password = "Password minimal 6 karakter";
  }

  return errors;
};
