import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCriteria, updateCriteria } from "../api/criteria";
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
    data: ICriteriaData[];
  };

  const updateMutation = useMutation({
    mutationFn: ({ data }: updateMutationType) => {
      return updateCriteria(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria"] });
    },
  });

  return {
    criterias,
    error,
    isError,
    isFetched,
    isLoading,
    updateCriteria: updateMutation.mutateAsync,
  };
}
