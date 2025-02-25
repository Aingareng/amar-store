import { api } from "../../../shared/utils/api";
import {
  Employees,
  IEmployeeQueryParams,
  IEmployeesResponse,
} from "../types/employees";

export async function getEmployees(params: IEmployeeQueryParams) {
  const response = await api.get<IEmployeesResponse>("/employees", {
    ...params,
  });
  if (response.status != 200) {
    return [];
  }
  return response.data as Employees[];
}
