import { Search } from "lucide-react";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-20 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600"
    >
      <div className="flex flex-col items-center mx-auto w-fit px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl mb-4 text-(--text-color-2) text-center max-md:text-4xl"
        >
          Discover Amazing Images
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-(--text-color-secondary) text-xl mb-8 text-center max-md:text-lg"
        >
          Explore, share, and connect with creative minds from around the world
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full relative text-(--input-placeholder-2)"
        >
          {/* Sr only label */}
          <label htmlFor="search-images" className="sr-only">
            Search images, tags, or artists
          </label>

          <input
            type="text"
            name="search-images"
            id="search-images"
            className="text-sm py-3.5 pr-4 pl-12 bg-(--text-color-2) rounded-lg w-full"
            placeholder="Search images, tags, or artists..."
          />
          <Search
            aria-hidden="true"
            size={20}
            // this does not allow the icon to block focus click or typing
            pointerEvents="none"
            className="absolute text-[#99A1AF] left-4 -translate-y-1/2 top-1/2"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
