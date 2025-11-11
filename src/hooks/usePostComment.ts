import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, type CommentStructure } from "../services/imagesApi";
import toast from "react-hot-toast";

export function usePostComment(imageId: number) {
  const queryClient = useQueryClient();

  const {
    mutate: postComment,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ imageId, comment }: CommentStructure) =>
      addComment({ imageId, comment }),

    // Revalidate the comments after a user comments
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", imageId] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Please sign in to comment on this image");
    },
  });

  return { postComment, data, isPending, error };
}
