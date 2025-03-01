import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createEmployee,
  getEmployees,
  destroyEmployee,
  editEmployee,
} from "../api/employee";
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

  const destroyMutaion = useMutation({
    mutationFn: (params: { id: string }) => destroyEmployee(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  type payloadEditType = {
    id: string;
    employeeData: IEmployeePayload;
  };

  const editMutation = useMutation({
    mutationFn: ({ id, employeeData }: payloadEditType) =>
      editEmployee({ id }, employeeData),
  });

  return {
    employees,
    error,
    isError,
    isLoading,
    isPending,
    isFetched,
    createEmployee: createMutation.mutateAsync,
    editEmployee: editMutation.mutateAsync,
    deleteEmployee: destroyMutaion.mutateAsync,
  };
}
