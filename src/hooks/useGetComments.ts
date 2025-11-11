import { useQuery } from "@tanstack/react-query";
import { getImageComments } from "../services/imagesApi";

export function useGetComments(imageId: number) {
  const { data, isPending } = useQuery({
    queryKey: ["comments", imageId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getImageComments(id as number);
    },
  });

  return { data, isPending };
}
