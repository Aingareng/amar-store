import { ICriteriaDatas } from "../types/criteria";

export interface IFormErrors {
  criteria_code?: string;
  criteria_name?: string;
  criteria_type?: string;
  criteria_priority?: string;
}

export function validateCriteriaForm(data: ICriteriaDatas) {
  const errors: IFormErrors = {};
  const { criteria_code, criteria_name, criteria_priority, criteria_type } =
    data;

  if (!criteria_code?.trim()) {
    errors.criteria_code = "Nomor kriteria tidak boleh kosong.";
  }
  if (!criteria_name?.trim()) {
    errors.criteria_name = "Nama kriteria tidak boleh kosong";
  }
  if (!criteria_type?.trim()) {
    errors.criteria_type = "Jenis kriteria tidak boleh kosong";
  }
  if (criteria_priority && (criteria_priority < 1 || criteria_priority > 5)) {
    errors.criteria_priority = "Nilai harus berada dalam rentang 1 sampai 5.";
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}
