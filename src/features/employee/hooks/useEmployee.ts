import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createEmployee, getEmployees } from "../api/employee";
import { IEmployeePayload, IEmployeeQueryParams } from "../types/employees";

export default function useEmployees(params?: IEmployeeQueryParams) {
  const queryClient = useQueryClient();
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

  const createMutation = useMutation({
    mutationFn: (newEmployee: IEmployeePayload) => createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    employees,
    error,
    isError,
    isLoading,
    isPending,
    isFetched,
    createEmployee: createMutation.mutate,
  };
}
