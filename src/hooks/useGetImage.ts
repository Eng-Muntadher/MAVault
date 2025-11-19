import { useQuery } from "@tanstack/react-query";
import { getImage } from "../services/imagesApi";

export function useGetImage(imageId: number) {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: () => getImage(imageId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
