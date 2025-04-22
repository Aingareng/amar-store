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
  if (!data.k4) {
    errors.k4 = "Experience tidak boleh kosong.";
  }

  // Validasi leadership
  if (!data.k5) {
    errors.k5 = "Leadership tidak boleh kosong.";
  }
  if (+data.k5 < 1) {
    errors.k5 = "Leadership tidak boleh kurang dari 1.";
  } else if (+data.k5 > 100) {
    errors.k5 = "Leadership tidak boleh lebih dari 100.";
  }

  // Validasi age
  if (!data.k3) {
    errors.k3 = "Umur tidak boleh kosong.";
  }

  // Validasi education
  if (!data.k2) {
    errors.k2 = "Education tidak boleh kosong.";
  }

  // Validasi skill
  if (!data.k1) {
    errors.k1 = "Skill tidak boleh kosong.";
  }
  if (+data.k1 < 1) {
    errors.k1 = "Skill tidak boleh kurang dari 1.";
  } else if (+data.k1 > 100) {
    errors.k1 = "Skill tidak boleh lebih dari 100.";
  }

  // Jika tidak ada error, maka isValid = true
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}
