import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { increaseViews } from "../services/imagesApi";

export function useIncreaseViews(imageId: number) {
  const queryClient = useQueryClient();
  const hasIncrementedRef = useRef(false);
  const increaseViewsMutation = useMutation({
    mutationFn: increaseViews,
    onSuccess: () => {
      // Invalidate so fresh data is fetched, or update cache after success
      queryClient.invalidateQueries({ queryKey: ["image", imageId] });
    },
    onError: () => {
      // Handle error if needed
      console.error("Failed to increase views");
    },
  });

  useEffect(() => {
    // Only increment once per imageId
    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      increaseViewsMutation.mutate(imageId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  return {
    isPending: increaseViewsMutation.isPending,
    isError: increaseViewsMutation.isError,
    error: increaseViewsMutation.error,
  };
}
