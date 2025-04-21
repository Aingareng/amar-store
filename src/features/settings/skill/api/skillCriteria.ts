import { api } from "../../../../shared/utils/api";
import IApiResponse from "../../../../types/apiResponse";
import {
  ISkillPayload,
  ISkillQueryParams,
  ISkillTableData,
} from "../types/skill";

const PREFFIX_ROUTE = "/skill-criteria";

const get = async (params?: ISkillQueryParams) =>
  api.get<IApiResponse<ISkillTableData>>(PREFFIX_ROUTE, {
    ...params,
  });

const create = async (payload: ISkillPayload) =>
  await api.post<IApiResponse<null>>(PREFFIX_ROUTE, payload);

const update = async (id: number, payload: ISkillPayload) =>
  await api.put<IApiResponse<null>>(`${PREFFIX_ROUTE}/${id}`, payload);

const destroy = async (id: number) => await api.delete(id.toString());

export { get, create, update, destroy };
