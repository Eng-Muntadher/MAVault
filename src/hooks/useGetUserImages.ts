import { useQuery } from "@tanstack/react-query";
import { getUserImages } from "../services/imagesApi";

export function useGetUserImages(filter: string) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userImages", filter],
    queryFn: ({ queryKey }) => {
      const [, filter] = queryKey; // "likedImages" is first, imagesLabel is second
      return getUserImages(filter);
    },
  });

  return { data, isPending, isError, error };
}
