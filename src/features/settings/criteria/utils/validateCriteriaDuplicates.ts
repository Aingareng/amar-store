import { ICriteriaData, ICriteriaPayload } from "../types/criteria";
import { IFormErrors } from "./validateFormInput";

interface IDuplicateCheckParams {
  existingCriterias: ICriteriaData[];
  currentData: ICriteriaPayload;
  modalType: "CREATE" | "UPDATE";
  defaultValue?: ICriteriaData;
}

export interface IDuplicateErrors extends IFormErrors {
  name?: string;
  code?: string;
}

export function validateCriteriaDuplicates({
  existingCriterias,
  currentData,
  modalType,
  defaultValue,
}: IDuplicateCheckParams): IDuplicateErrors {
  const errors: IDuplicateErrors = {};

  // Validasi duplikat nama

  const isNameDuplicate = existingCriterias.some((criteria) => {
    const isSameName = criteria.name === currentData.name;

    if (modalType === "UPDATE") {
      return isSameName && criteria.id !== defaultValue?.id;
    }

    return isSameName;
  });

  // Validasi duplikat kode
  const isCodeDuplicate = existingCriterias.some((criteria) => {
    const isSameCode = criteria.code === currentData.code;

    if (modalType === "UPDATE") {
      return isSameCode && criteria.id !== defaultValue?.id;
    }

    return isSameCode;
  });

  if (isNameDuplicate) errors.name = "Nama kriteria sudah ada";
  if (isCodeDuplicate) errors.code = "Kode kriteria sudah ada";

  return errors;
}
