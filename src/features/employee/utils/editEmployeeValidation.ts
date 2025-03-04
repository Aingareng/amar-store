import { IEmployeePayload } from "../types/employees";

/**
 * validateEmployeeData
 * @param data Objek yang berisi data karyawan
 * @returns Objek { isValid: boolean, errors: Record<string, string> }
 */
export function validateEmployeeData(data: IEmployeePayload) {
  const errors: Record<string, string> = {};

  // Validasi username
  // if (!data.username.trim()) {
  //   errors.username = "Username tidak boleh kosong.";
  // } else if (data.username.length < 3) {
  //   errors.username = "Username minimal terdiri dari 3 karakter.";
  // }

  // Validasi email
  if (!data.email.trim()) {
    errors.email = "Email tidak boleh kosong.";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      errors.email = "Format email tidak valid.";
    }
  }

  // Validasi password
  if (!data.password.trim()) {
    errors.password = "Password tidak boleh kosong.";
  } else if (data.password.length < 6) {
    errors.password = "Password minimal terdiri dari 6 karakter.";
  }

  // Validasi position
  if (!data.position.trim()) {
    errors.position = "Position tidak boleh kosong.";
  }

  // Validasi phone
  if (!data.phone.trim()) {
    errors.phone = "Nomor telepon tidak boleh kosong.";
  } else {
    const phonePattern = /^[0-9()+\-.\s]+$/;
    if (!phonePattern.test(data.phone)) {
      errors.phone =
        "Nomor telepon hanya boleh mengandung angka dan karakter +, -, (, ).";
    }
  }

  // Validasi experience
  if (!data.experience) {
    errors.experience = "Experience tidak boleh kosong.";
  }

  // Validasi leadership
  if (!data.leadership) {
    errors.leadership = "Leadership tidak boleh kosong.";
  }

  // Validasi age
  if (!data.age) {
    errors.age = "Umur tidak boleh kosong.";
  }

  // Validasi education
  if (!data.education) {
    errors.education = "Education tidak boleh kosong.";
  }

  // Validasi skill
  if (!data.skill) {
    errors.skill = "Skill tidak boleh kosong.";
  }

  // Jika tidak ada error, maka isValid = true
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}
