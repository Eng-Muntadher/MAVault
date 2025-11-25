import { useQuery } from "@tanstack/react-query";
import { fetchMyOwnInfo } from "../services/userApi";

// This hook is used to preserve my contact info fetched from Supabase is cach
export function useMyOwnInfo() {
  const { data, isPending } = useQuery({
    queryKey: ["myOwnInfo"],
    queryFn: fetchMyOwnInfo,
    // Don't fetch immediately, wait 3 seconds
    enabled: true,
    staleTime: 15 * 60 * 1000, // Keep for 15 minutes
    // Don't refetch on every window focus
    refetchOnWindowFocus: false,
    // Longer retry delay
    retry: 1,
  });
  return { data, isPending };
}
