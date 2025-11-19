import { useQuery } from "@tanstack/react-query";
import { getImages, type ImageFilters } from "../services/imagesApi";

export function useGetImages(
  page: number,
  pageSize: number = 12,
  filter: ImageFilters
) {
  return useQuery({
    queryKey: ["images", page, pageSize, filter],
    queryFn: () => getImages(page, pageSize, filter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
