import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkImage } from "../services/userApi";
import toast from "react-hot-toast";

export function useBookMarkImage() {
  const queryClient = useQueryClient();

  const {
    mutate: bookmark,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: (imageId: number) => bookmarkImage(imageId),

    // Revalidate the current user after bookmarking or 'unboomarking' if that's even a word 🤔
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({
        queryKey: ["userImages", "saved"],
      });
      // After the revalidation, the user should see the bookmark added and the icon changes
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Please sign in to bookmark this image");
    },
  });

  return { bookmark, data, isPending, error };
}
