import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employee";
import { IEmployeeQueryParams } from "../types/employees";

export default function useEmployees(params?: IEmployeeQueryParams) {
  const {
    data: employees,
    error,
    isError,
    isLoading,
    isPending,
    isFetched,
  } = useQuery({
    initialData: [],
    queryKey: ["employees", params],
    queryFn: () => getEmployees(params as IEmployeeQueryParams),
  });

  return { employees, error, isError, isLoading, isPending, isFetched };
}
