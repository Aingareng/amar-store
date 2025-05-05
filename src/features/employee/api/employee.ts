import { api } from "../../../shared/utils/api";
import IApiResponse from "../../../types/apiResponse";
import {
  Employees,
  IEmployeePayload,
  IEmployeeQueryParams,
  IEmployeesResponse,
} from "../types/employees";

export async function getEmployees(params: IEmployeeQueryParams) {
  return await api.get<IApiResponse<Employees[]>>("/employees", {
    ...params,
  });
}
export async function createEmployee(data: IEmployeePayload) {
  return await api.post<IEmployeesResponse>("/employees", data);
}
export async function destroyEmployee(params: { id: string }) {
  return await api.delete<IEmployeesResponse>("/employees", {
    ...params,
  });
}
export async function editEmployee(
  params: { id: string },
  data: IEmployeePayload
) {
  return await api.put<IEmployeesResponse>("/employees", data, { ...params });
}
