import SignUpForm from "../components/SignUpForm";
import { motion } from "framer-motion";

function SignUp() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center py-12 bg-linear-to-br sign-up-bg border-t border-b border-(--border-color) backdrop-blur-md mb-8 px-4 sm:px-6 lg:px-6"
    >
      <h1 className="text-3xl text-(--text-color) mb-2 text-center">
        Create an account
      </h1>

      <p className="text-(--input-placeholder) mb-8 text-center">
        Join my community of creative minds 😊
      </p>
      <SignUpForm />
    </motion.div>
  );
}

export default SignUp;
