import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData as updateUserDataApi } from "../services/userApi";
import type { userUpdatedData } from "../services/userApi";
import { useNavigate } from "react-router-dom";

export function useUpdateUserData() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUserData, isPending } = useMutation<
    void, // Return type of mutation function
    unknown, // Error type
    userUpdatedData // Input type
  >({
    mutationFn: (data: userUpdatedData) => updateUserDataApi(data),
    onSuccess: () => {
      toast.success("Profile successfully edited!");
      queryClient.invalidateQueries({ queryKey: ["currentUser"], exact: true });
      navigate("/user-profile/9");
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
