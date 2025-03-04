export const calculateExperience = (startDateString: string): number => {
  if (!startDateString) return 0;

  const startDate = new Date(startDateString);
  const today = new Date();

  let experience = today.getFullYear() - startDate.getFullYear();
  const monthDiff = today.getMonth() - startDate.getMonth();

  // Koreksi pengalaman jika bulan sekarang lebih awal dari bulan mulai kerja
  if (monthDiff < 0) {
    experience--;
  }

  return experience; // Dibulatkan ke bawah (floor)
};
