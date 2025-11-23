import { motion } from "framer-motion";
import UploadImageHeading from "../components/UploadImageHeading";
import UploadImageForm from "../components/UploadImageForm";
import BackButton from "../components/BackButton";
import { useEffect } from "react";

function Upload() {
  // This use effect resets the scroll of the page to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-(--landing-page-bg) pt-8 border-b border-(--border-color) backdrop-blur-md mb-8 delay"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton text="Back" addedClasses="mb-8" />
        <UploadImageHeading />
        <UploadImageForm />
      </div>
    </motion.div>
  );
}

export default Upload;
