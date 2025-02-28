import { IEmployeePayload } from "../types/employees";

/**
 * validateEmployeeData
 * @param data Objek yang berisi data karyawan
 * @returns Objek { isValid: boolean, errors: Record<string, string> }
 */
export function validateEmployeeData(data: IEmployeePayload) {
  const errors: Record<string, string> = {};

  // Validasi username
  if (!data.username.trim()) {
    errors.username = "Username tidak boleh kosong.";
  } else if (data.username.length < 3) {
    errors.username = "Username minimal terdiri dari 3 karakter.";
  }

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
  if (!data.experience.trim()) {
    errors.experience = "Experience tidak boleh kosong.";
  } else {
    // Misalkan experience disimpan sebagai tanggal mulai bekerja
    const dateOfExperience = new Date(data.experience);
    if (isNaN(dateOfExperience.getTime())) {
      errors.experience = "Format tanggal experience tidak valid.";
    } else if (dateOfExperience > new Date()) {
      errors.experience = "Tanggal experience tidak boleh di masa depan.";
    }
  }

  // Validasi leadership
  if (!data.leadership.trim()) {
    errors.leadership = "Leadership tidak boleh kosong.";
  }

  // Validasi age
  if (!data.age.trim()) {
    errors.age = "Umur / Tanggal lahir tidak boleh kosong.";
  } else {
    // Misalkan age disimpan sebagai tanggal lahir (birthdate)
    const dateOfBirth = new Date(data.age);
    if (isNaN(dateOfBirth.getTime())) {
      errors.age = "Format tanggal lahir tidak valid.";
    } else if (dateOfBirth > new Date()) {
      errors.age = "Tanggal lahir tidak boleh di masa depan.";
    }
  }

  // Validasi education
  if (!data.education.trim()) {
    errors.education = "Education tidak boleh kosong.";
  }

  // Jika tidak ada error, maka isValid = true
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}

// import { z } from "zod";

// export const employeeSchema = z.object({
//   username: z.string().min(3, "Username minimal 3 karakter"),
//   email: z.string().email("Format email tidak valid"),
//   password: z.string().min(6, "Password minimal 6 karakter"),
//   phone: z
//     .string()
//     .regex(/^\+?\d{10,15}$/, "Nomor telepon tidak valid (harus 10-15 digit)"),
//   gender: z.enum(["male", "female"]),
//   age: z.date().refine((date) => date <= new Date(), {
//     message: "Tanggal lahir tidak boleh di masa depan",
//   }),
//   education: z.string().min(2, "Pendidikan tidak boleh kosong"),
//   experience: z.date().refine((date) => date <= new Date(), {
//     message: "Tanggal pengalaman tidak boleh di masa depan",
//   }),
//   leadership: z.string().optional(), // Bisa kosong
//   position: z.string().min(2, "Posisi tidak boleh kosong"),
// });

// // Fungsi untuk validasi
// export const validateEmployee = (data: unknown) => {
//   const result = employeeSchema.safeParse(data);
//   if (!result.success) {
//     return result.error.format();
//   }
//   return null;
// };
