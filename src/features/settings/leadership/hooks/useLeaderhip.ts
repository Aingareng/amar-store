import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, destroy, get, update } from "../api/leadership";
import {
  ILeadershipPayload,
  ILeadershipQueryParams,
} from "../types/leadership";

type updateMutationType = {
  id: number;
  payload: ILeadershipPayload;
};

export default function useLeaderhip(params?: ILeadershipQueryParams) {
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
    queryKey: ["leadership-criteria", params],
    queryFn: () => (params ? get(params) : get()),
  });
  const createMutation = useMutation({
    mutationFn: (payload: ILeadershipPayload) => create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["leadership-criteria"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: updateMutationType) => update(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["leadership-criteria"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => destroy(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["leadership-criteria"] }),
  });
  return {
    criterias,
    error,
    isError,
    isFetched,
    isLoading,
    isPending,
    isFetching,
    createLeadership: createMutation.mutateAsync,
    updateLeadership: updateMutation.mutateAsync,
    destroyLeadership: deleteMutation.mutateAsync,
  };
}
