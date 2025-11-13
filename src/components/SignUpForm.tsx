import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

function SignUpForm() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signUp, isPending } = useSignUp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password === confirmPassword) {
      signUp({ email, password, userName });
    } else {
      toast.error("Passwords must match!");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) p-6 w-md max-w-full"
    >
      {isPending ? <LoadingSpinner /> : null}

      <h2 className="text-(--text-color) font-semibold mb-1.5">Sign Up</h2>
      <p className="block text-(--input-placeholder-2) mb-6">
        Enter your details to create a new account{" "}
      </p>

      <label
        htmlFor="username"
        className="block text-(--text-color) text-sm font-semibold mb-2"
      >
        Username
      </label>
      <Input
        type="text"
        required={true}
        value={userName}
        id="username"
        name="username"
        autoComplete="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        addedClasses="text-sm w-full mb-4"
        placeholder="Enter your username"
      />

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
        addedClasses="text-sm w-full mb-4"
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
        addedClasses="text-sm w-full mb-4"
        placeholder="Enter your password"
      />

      <label
        htmlFor="password"
        className="block text-(--text-color) text-sm font-semibold mb-2"
      >
        Confirm Password
      </label>
      <Input
        type="password"
        required={true}
        value={confirmPassword}
        id="confirm-password"
        name="confirm-password"
        autoComplete="new-password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        addedClasses="text-sm w-full mb-5"
        placeholder="Confirm your password"
      />

      <button className="btn-bg text-(--text-color-2) text-sm font-semibold text-center py-2 px-4 w-full mb-4 rounded-lg cursor-pointer">
        Sign Up
      </button>

      <p className="text-sm text-(--input-placeholder) text-center">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-(--selected-btn-pagination)">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
