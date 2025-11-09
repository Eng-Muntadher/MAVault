import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../services/userApi";

export function useGetUserInfo(userId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["currentUserInfo", userId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; // second item is the userId
      return getUserData(id as string);
    },
    enabled: !!userId, // only run if userId exists
  });

  return { data, isPending };
}
