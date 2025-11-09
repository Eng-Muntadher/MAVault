import { useQuery } from "@tanstack/react-query";
import { getImages } from "../services/imagesApi";

export function useGetImages() {
  const { data, isPending } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
  });
  return { data, isPending };
}
