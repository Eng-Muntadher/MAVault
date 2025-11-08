import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/userApi";
import { type User } from "@supabase/supabase-js";
import { useEffect } from "react";
import supabase from "../services/supabase";

export function useUser() {
  const queryClient = useQueryClient();

  const query = useQuery<User | null, Error>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  // Subscribe to auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Update query cache immediately
        queryClient.setQueryData(["currentUser"], session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [queryClient]);

  return query; // contains { data, isLoading, isError, error }
}
