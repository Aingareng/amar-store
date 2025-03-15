import { useQuery } from "@tanstack/react-query";
import { findCriteria } from "../api/criteria";

export function useCriteriaById(id: number | undefined) {
  return useQuery({
    queryKey: ["criteria", id],
    // hanya fetch kalau id ada (enabled: !!id)
    enabled: !!id,
    queryFn: () => {
      if (!id) return null; // atau lempar error
      return findCriteria({ id }); // panggil API get data by id
    },
  });
}
