import { useQuery } from "@tanstack/react-query";
import { fetchMyOwnInfo } from "../services/userApi";

export function useMyOwnInfo() {
  const { data, isPending } = useQuery({
    queryKey: ["myOwnInfo"],
    queryFn: fetchMyOwnInfo,
  });
  return { data, isPending };
}
