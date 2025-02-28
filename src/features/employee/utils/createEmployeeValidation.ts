import { z } from "zod";

export const employeeSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Nomor telepon tidak valid (harus 10-15 digit)"),
  gender: z.enum(["male", "female"]),
  age: z.date().refine((date) => date <= new Date(), {
    message: "Tanggal lahir tidak boleh di masa depan",
  }),
  education: z.string().min(2, "Pendidikan tidak boleh kosong"),
  experience: z.date().refine((date) => date <= new Date(), {
    message: "Tanggal pengalaman tidak boleh di masa depan",
  }),
  leadership: z.string().optional(), // Bisa kosong
  position: z.string().min(2, "Posisi tidak boleh kosong"),
});

// Fungsi untuk validasi
export const validateEmployee = (data: unknown) => {
  const result = employeeSchema.safeParse(data);
  if (!result.success) {
    return result.error.format();
  }
  return null;
};
