import { useQuery } from "@tanstack/react-query";
import { getPublishersInfo } from "../services/userApi";

export function useFetchPublisherInfo(userId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["publishersInfo", userId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; // second item is the userId
      return getPublishersInfo(id as string);
    },
    enabled: !!userId, // only run if userId exists
  });

  return { data, isPending };
}
