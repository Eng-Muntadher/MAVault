import { useQuery } from "@tanstack/react-query";
import { getCategoriesCounts } from "../services/imagesApi";

export function useGetCategoriesCount() {
  return useQuery({
    queryKey: ["categoriesCount"],
    queryFn: getCategoriesCounts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
