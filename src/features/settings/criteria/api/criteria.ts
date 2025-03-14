import { api } from "../../../../shared/utils/api";
import {
  ICriteriaData,
  ICriteriaQueryParams,
  ICriteriaResponse,
} from "../types/criteria";

export async function getCriteria(params: ICriteriaQueryParams) {
  const response = await api.get<ICriteriaResponse>("/criterias", {
    ...params,
  });

  if (response.status != 200) {
    return [];
  }
  return response.data as ICriteriaData[];
}

export async function updateCriteria(
  criteriaId: number,
  data: ICriteriaData[]
) {
  return api.put<ICriteriaResponse>(`/criterias?id=${criteriaId}`, {
    data: data,
  });
}
export async function createCriteria(payload: ICriteriaData) {
  return api.post<ICriteriaResponse>("/criterias", payload);
}

export async function deleteCriteria(id: number) {
  return api.delete<ICriteriaResponse>(`/criteria?id=${id}`);
}
