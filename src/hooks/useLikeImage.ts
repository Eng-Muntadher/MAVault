import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleImageLike } from "../services/userApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useLikeImage() {
  const queryClient = useQueryClient();

  const { imageId } = useParams(); // get the image id from the URL

  const {
    mutate: toggleLike,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: (imageId: number) => toggleImageLike(imageId),

    // Revalidate the images list after liking/unliking
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.invalidateQueries({
        queryKey: ["userImages", "liked"],
      });
      queryClient.invalidateQueries({ queryKey: ["image", Number(imageId)] });
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Please sign in to like this image");
    },
  });

  return { toggleLike, data, isPending, error };
}
