import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISkillPayload, ISkillQueryParams } from "../types/skill";
import { create, destroy, get, update } from "../api/skillCriteria";

type updateMutationType = {
  id: number;
  payload: ISkillPayload;
};
export default function useSkillCriteria(params?: ISkillQueryParams) {
  const queryClient = useQueryClient();

  const {
    data: skillCriterias,
    error,
    isError,
    isFetched,
    isLoading,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["skill-criteria", params],
    queryFn: () => (params ? get(params) : get()),
  });

  const createMutation = useMutation({
    mutationFn: async (payload: ISkillPayload) => await create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["skill-criteria"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: updateMutationType) => update(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["skill-criteria"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => destroy(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["skill-criteria"] }),
  });

  return {
    skillCriterias,
    error,
    isError,
    isFetched,
    isLoading,
    isPending,
    isFetching,
    createSkillCriteria: createMutation.mutateAsync,
    updateSkillCriteria: updateMutation.mutateAsync,
    destroySkillCriteria: deleteMutation.mutateAsync,
  };
}
