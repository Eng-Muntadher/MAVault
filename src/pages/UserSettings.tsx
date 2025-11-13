import { motion } from "framer-motion";
import BackButton from "../components/BackButton";
import UpdateUserInfoForm from "../components/UpdateUserInfoForm";

function UserSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-(--landing-page-bg) pt-9 border-t border-b border-(--border-color) backdrop-blur-md mb-8 px-4 sm:px-6 lg:px-6"
    >
      <div className="max-w-[832px] mx-auto ">
        <BackButton
          text="Back to Profile"
          addedClasses="mb-6 h-9"
          to="/user-profile"
        />
        <h1 className="text-(--text-color) text-3xl mb-8">Profile Settings</h1>

        <UpdateUserInfoForm />
      </div>
    </motion.div>
  );
}

export default UserSettings;
