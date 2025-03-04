import { api } from "../../../../shared/utils/api";
import { ICriteriaData, ICriteriaResponse } from "../types/criteria";

export async function getCriteria() {
  const response = await api.get<ICriteriaResponse>("/settings");

  if (response.status != 200) {
    return [];
  }
  return response.data as ICriteriaData[];
}

export async function updateCriteria(data: ICriteriaData[]) {
  return api.put<ICriteriaResponse>("/settings", { data: data });
}
