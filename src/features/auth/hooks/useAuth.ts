import { useMutation, useQueryClient } from "@tanstack/react-query";
import Login, { payloadType } from "../api/login";

export default function useAuth() {
  const queryClient = useQueryClient();
  const loginMutatio = useMutation({
    mutationFn: (payload: payloadType) => Login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  return {
    postLogin: loginMutatio.mutateAsync,
  };
}
