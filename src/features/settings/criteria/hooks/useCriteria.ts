import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCriteria,
  deleteCriteria,
  getCriteria,
  updateCriteria,
} from "../api/criteria";
import { ICriteriaData } from "../types/criteria";

export default function useCriteria() {
  const queryClient = useQueryClient();
  const {
    data: criterias,
    error,
    isError,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["criteria"],
    queryFn: getCriteria,
    initialData: [],
  });

  type updateMutationType = {
    id: number;
    payload: ICriteriaData[];
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: updateMutationType) => {
      return updateCriteria(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (payload: ICriteriaData) => createCriteria(payload),
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
    updateCriteria: updateMutation.mutateAsync,
    createCriteria: createMutation.mutateAsync,
    deleteCriteria: deleteMutation.mutateAsync,
  };
}
