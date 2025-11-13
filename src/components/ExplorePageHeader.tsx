import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function ExplorePageHeader() {
  return (
    <motion.section
      aria-labelledby="explore-heading"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="flex gap-3 items-center mb-4" id="explore-heading">
        <span
          className="p-2 purple-bg text-white rounded-[0.625rem]"
          aria-hidden={true}
        >
          <TrendingUp size={24} />
        </span>
        <span className="text-(--text-color) text-4xl">Explore</span>
      </h1>

      <p className="text-(--input-placeholder) text-lg mb-8">
        Discover trending images, featured collections, and fresh content from
        our community
      </p>
    </motion.section>
  );
}

export default ExplorePageHeader;
