import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  login,
  login as signInApi,
  type LoginArguments,
} from "../services/userApi";
import { toast } from "react-hot-toast";

type LoginResult = Awaited<ReturnType<typeof login>>;

export function useSignIn() {
  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useMutation<
    LoginResult,
    Error,
    LoginArguments
  >({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: () => navigate("/"),
    onError: (error) => {
      console.log(error);
      toast.error(
        "Please make sure your email and password are correct or check your connection"
      );
    },
  });
  return { signIn, isPending };
}
