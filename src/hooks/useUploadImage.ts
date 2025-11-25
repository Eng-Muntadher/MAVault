import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { uploadImage as uploadImageApi } from "../services/imagesApi";

export function useUploadImage() {
  const queryClient = useQueryClient();

  const { isPending, mutate: uploadImage } = useMutation({
    mutationFn: uploadImageApi,
    retry: 0,
    onSuccess: () => {
      toast.success("Image successfully uploaded!");

      queryClient.invalidateQueries({
        queryKey: ["images"],
        exact: false, // allow partial match
      });
    },
    onError: (error) => {
      toast.error("Faild to upload! Please check your connection.");
      console.error(error);
    },
  });

  return { uploadImage, isPending };
}
