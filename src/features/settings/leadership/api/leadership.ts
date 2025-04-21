import { api } from "../../../../shared/utils/api";
import IApiResponse from "../../../../types/apiResponse";
import {
  ILeadershipPayload,
  ILeadershipQueryParams,
  ILeadershipTableData,
} from "../types/leadership";

const PREFIX_ROUTE = "/leadership-cirteria";

export const get = async (params?: ILeadershipQueryParams) =>
  await api.get<IApiResponse<ILeadershipTableData>>(PREFIX_ROUTE, {
    ...params,
  });

export const create = async (payload: ILeadershipPayload) =>
  await api.post<IApiResponse<null>>(PREFIX_ROUTE, payload);

export const update = async (id: number, payload: ILeadershipPayload) =>
  await api.put<IApiResponse<null>>(`${PREFIX_ROUTE}/${id}`, payload);

export const destroy = async (id: number) =>
  await api.delete(PREFIX_ROUTE, { id: id.toString() });
