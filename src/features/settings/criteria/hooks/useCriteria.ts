import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCriteria,
  deleteCriteria,
  getCriteria,
  updateCriteria,
} from "../api/criteria";
import { ICriteriaPayload, ICriteriaQueryParams } from "../types/criteria";

type updateMutationType = {
  id: number;
  payload: ICriteriaPayload;
};

export default function useCriteria(params?: ICriteriaQueryParams) {
  const queryClient = useQueryClient();
  const {
    data: criterias,
    error,
    isError,
    isFetched,
    isLoading,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["criteria", params],
    queryFn: () => getCriteria(params as ICriteriaQueryParams),
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: updateMutationType) => {
      return updateCriteria(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: ICriteriaPayload) => createCriteria(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["criteria"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCriteria(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["criteria"] }),
  });

  return {
    criterias,
    error,
    isError,
    isFetched,
    isLoading,
    isPending,
    isFetching,
    updateCriteria: updateMutation.mutateAsync,
    createCriteria: createMutation.mutateAsync,
    deleteCriteria: deleteMutation.mutateAsync,
  };
}
