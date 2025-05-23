import { api } from "../../../../shared/utils/api";
import {
  ICriteriaData,
  ICriteriaPayload,
  ICriteriaQueryParams,
  ICriteriaResponse,
} from "../types/criteria";

export async function getCriteria(params: ICriteriaQueryParams) {
  return await api.get<ICriteriaResponse>("/criterias", {
    ...params,
    id: params.id?.toString() as string,
  });
}

export async function findCriteria({ id }: ICriteriaQueryParams) {
  const response = await api.get<ICriteriaResponse>(`/criterias/${id}`);

  if (response.status != 200) {
    return [];
  }
  return response.data as ICriteriaData;
}

export async function updateCriteria(
  criteriaId: number,
  data: ICriteriaPayload
) {
  return await api.put<ICriteriaResponse>(`/criterias?id=${criteriaId}`, {
    data: data,
  });
}
export async function createCriteria(payload: ICriteriaPayload) {
  const response = await api.post<ICriteriaResponse>("/criterias", payload);

  if (response.status !== 400 && response.status !== 500) {
    return;
  }

  return response;
}

export async function deleteCriteria(id: number) {
  return await api.delete<ICriteriaResponse>(`/criterias`, {
    id: id.toString(),
  });
}
