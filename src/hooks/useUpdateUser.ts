import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData as updateUserDataApi } from "../services/userApi";
import type { userUpdatedData } from "../services/userApi";

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { mutate: updateUserData, isPending } = useMutation<
    void, // Return type of mutation function
    unknown, // Error type
    userUpdatedData // Input type
  >({
    mutationFn: ({ userName, bio, location, avatar }: userUpdatedData) =>
      updateUserDataApi({ userName, bio, location, avatar }),
    onSuccess: () => {
      toast.success("Profile successfully edited!");
      queryClient.invalidateQueries({
        queryKey: ["currentUserInfo"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        "There was an error updating profile info! Please try again later"
      );
    },
  });

  return { isPending, updateUserData };
}
