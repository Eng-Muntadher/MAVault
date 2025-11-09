import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ImageItemProps {
  image: string;
  imageId: number;
  title: string;
  artistImage: string;
  category: string;
  artistName: string;
  likes: number;
  describtion: string;
  imageWidth?: number;
  imageheight?: number;
}
function ImageItem({
  image,
  imageId,
  artistImage,
  category,
  artistName,
  likes,
  describtion,
  title,
}: ImageItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/image-details/${imageId}`}
        className="min-w-[286px] relative group"
      >
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img
            src={image}
            className="rounded-xl transition-transform duration-500 group-hover:scale-110 max-h-72 w-full object-cover"
          />

          {/* Image info on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4"
          >
            {/* Top Actions */}
            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/40 transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/40 transition-colors cursor-pointer"
              >
                <Bookmark className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Bottom Info */}
            <div className="text-white">
              <h3 className="text-lg mb-1 line-clamp-1">{title}</h3>
              <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                {describtion}
              </p>
            </div>
          </motion.div>
        </div>

        <span className="flex px-3 py-1 text-xs text-(--text-color-2) absolute left-3 top-[0.85rem] rounded-full bg-black/50 backdrop-blur-sm">
          {category}
        </span>

        {/* Image footer */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={artistImage}
              className="h-[26px] w-[26px] rounded-full"
              alt={describtion}
            />
            <span className="text-(--nav-links-color) text-sm">
              {artistName}
            </span>
          </div>

          <div className="flex items-center gap-1 text-(--input-placeholder)">
            <Heart size={16} aria-hidden="true" />
            <span className="text-sm">{likes}</span>
          </div>
        </div>

        <p className="text-(--text-color)">{title}</p>
      </Link>
    </motion.div>
  );
}

export default ImageItem;
