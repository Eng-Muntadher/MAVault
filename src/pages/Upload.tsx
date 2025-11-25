import { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import UploadImageHeading from "../components/UploadImageHeading";
import BackButton from "../components/BackButton";

const UploadImageForm = lazy(() => import("../components/UploadImageForm"));

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

        <Suspense fallback={<div className="h-dvh w-full"></div>}>
          <UploadImageForm />
        </Suspense>
      </div>
    </motion.div>
  );
}

export default Upload;
