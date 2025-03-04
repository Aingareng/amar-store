function validateFormInput(rankOrder: Record<string, number>) {
  const values = Object.values(rankOrder);
  const uniqueValues = new Set(values);
  const errors = [];

  // Validasi 1: Tidak boleh kosong atau bernilai kurang dari 1
  if (values.some((val) => val < 1)) {
    errors.push("Semua field harus diisi dengan angka minimal 1.");
  }

  // Validasi 2: Tidak boleh ada nilai yang sama antar field
  if (uniqueValues.size !== values.length) {
    errors.push("Setiap peringkat harus memiliki nilai yang berbeda.");
  }

  // Validasi 3: Nilai harus dalam rentang 1 - 5
  if (values.some((val) => val < 1 || val > 5)) {
    errors.push("Nilai harus berada dalam rentang 1 sampai 5.");
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: [],
  };
}
export default validateFormInput;
