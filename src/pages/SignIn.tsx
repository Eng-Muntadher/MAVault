import SignInForm from "../components/SignInForm";
import { motion } from "framer-motion";

function SignIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center py-12 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 border-t border-b border-gray-200 backdrop-blur-md mb-8 px-4 sm:px-6 lg:px-6"
    >
      <h1 className="text-3xl text-(--text-color) mb-2 text-center">
        Welcome back
      </h1>

      <p className="text-(--input-placeholder) mb-8 text-center">
        Sign in to your account to continue
      </p>

      <SignInForm />

      <section
        aria-labelledby="demo-access-header"
        className="max-w-md mx-auto mt-7 p-6 rounded-2xl border border-blue-300/40 bg-blue-500/10 backdrop-blur-md shadow-lg transition-colors duration-300 w-full"
      >
        <h2
          id="demo-access-header"
          className="text-xl font-semibold text-blue-900 mb-3"
        >
          Demo Access Emails
        </h2>
        <ul className="space-y-2 list-disc ml-5">
          <li>a@b.com</li>
          <li>Ahmed@b.com</li>
          <li>Muntadher@a.com</li>
        </ul>
      </section>
    </motion.div>
  );
}

export default SignIn;
