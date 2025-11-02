import SignUpForm from "../components/SignUpForm";

function SignUp() {
  return (
    <div className="flex flex-col items-center py-12 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 border-t border-b border-gray-200 backdrop-blur-md mb-8 px-4 sm:px-6 lg:px-6">
      <h1 className="text-3xl text-(--text-color) mb-2 text-center">
        Create an account
      </h1>

      <p className="text-(--input-placeholder) mb-8 text-center">
        Join my community of creative minds 😊
      </p>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
