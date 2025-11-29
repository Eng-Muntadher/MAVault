import { Link, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { useSignIn } from "../hooks/useSignIn";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

function SignInForm() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  useEffect(() => {
    if (redirectTo) {
      toast.error("Please sign in to access this page!");
    }
  }, [redirectTo]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // A custom hook for sign in with React Query mutations and redirect state
  const { signIn, isPending } = useSignIn(redirectTo || "/");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn({ email, password });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) p-6 w-md max-w-full"
    >
      {isPending ? <LoadingSpinner /> : null}
      <h2 className="text-(--text-color) font-semibold mb-1.5">Sign In</h2>
      <p className="block text-(--input-placeholder-2) mb-6">
        Enter your credentials to access your account
      </p>

      <label
        htmlFor="email"
        className="block text-(--text-color) text-sm font-semibold mb-2"
      >
        Email
      </label>
      <Input
        type="email"
        required={true}
        value={email}
        id="email"
        name="email"
        autoComplete="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        addedClasses="text-sm max-sm:text-base w-full mb-4"
        placeholder="Enter your email"
      />

      <label
        htmlFor="password"
        className="block text-(--text-color) text-sm font-semibold mb-2"
      >
        Password
      </label>
      <Input
        type="password"
        required={true}
        value={password}
        id="password"
        name="password"
        autoComplete="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        addedClasses="text-sm max-sm:text-base w-full mb-1.5"
        placeholder="Enter your password"
      />

      <p className="text-xs mb-4 text-gray-500">
        Enter the password "ttoo2323" if you want demo access
      </p>

      <button className="btn-bg text-(--text-color-2) text-sm font-semibold text-center py-2 px-4 w-full mb-4 rounded-lg cursor-pointer">
        Sign In
      </button>

      <p className="text-sm text-(--input-placeholder) text-center">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-(--selected-btn-pagination)">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default SignInForm;
