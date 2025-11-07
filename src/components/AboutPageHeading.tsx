import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

function AboutPageHeading() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center mb-16"
      aria-labelledby="about-heading"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="purple-bg text-white flex items-center justify-center rounded-full h-20 w-20 mb-6"
      >
        <Lightbulb size={40} aria-hidden="true" />
      </motion.div>
      <h1
        className="text-5xl bg-linear-to-r from-[#155DFC] to-[#9810FA] bg-clip-text text-transparent mb-4"
        id="about-heading"
      >
        About MAVault
      </h1>
      <p className="text-xl text-(--input-placeholder) max-w-2xl">
        A modern, feature-rich image gallery application built to showcase
        professional web development skills
      </p>
    </motion.section>
  );
}

export default AboutPageHeading;
