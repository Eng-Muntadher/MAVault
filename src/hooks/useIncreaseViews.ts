import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { increaseViews, type Image } from "../services/imagesApi";

export function useIncreaseViews(imageId: number) {
  const queryClient = useQueryClient();
  const hasIncrementedRef = useRef(false);

  const increaseViewsMutation = useMutation({
    mutationFn: increaseViews,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["image", imageId] });

      const previousData = queryClient.getQueryData(["image", imageId]);

      queryClient.setQueryData(["image", imageId], (old: Image) => ({
        ...old,
        views: (old?.views ?? 0) + 1,
      }));

      return { previousData };
    },
    onError: () => {
      // Decrement views on error instead of reverting
      queryClient.setQueryData(["image", imageId], (old: Image) => ({
        ...old,
        views: Math.max((old?.views ?? 1) - 1, 0),
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image", imageId] });
    },
  });

  useEffect(() => {
    // Only increment once per imageId
    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      increaseViewsMutation.mutate(imageId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]); // Only depend on imageId

  return {
    isPending: increaseViewsMutation.isPending,
    isError: increaseViewsMutation.isError,
    error: increaseViewsMutation.error,
  };
}
