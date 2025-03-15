import { ICriteriaDatas } from "../types/criteria";

export interface IFormErrors {
  code?: string;
  name?: string;
  type?: string;
  rank_order?: string;
}

export function validateCriteriaForm(data: ICriteriaDatas) {
  const errors: IFormErrors = {};
  const { code, name, rank_order, type } = data;

  if (!code?.trim()) {
    errors.code = "Nomor kriteria tidak boleh kosong.";
  }
  if (!name?.trim()) {
    errors.name = "Nama kriteria tidak boleh kosong";
  }
  if (!type?.trim()) {
    errors.type = "Jenis kriteria tidak boleh kosong";
  }
  if (rank_order && (rank_order < 1 || rank_order > 5)) {
    errors.rank_order = "Nilai harus berada dalam rentang 1 sampai 5.";
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}
