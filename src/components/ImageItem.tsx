import { useUser } from "../hooks/useUser";
import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetchPublisherInfo } from "../hooks/useFetchPublisherInfo";
import { useLikeImage } from "../hooks/useLikeImage";
import { useBookMarkImage } from "../hooks/useBookMarkImage";
import {
  getResponsiveImageSizes,
  optimizeAvatarUrl,
} from "../services/imagesApi";
import GuestImage from "../assets/guest.jpeg";

interface ImageItemProps {
  image: string;
  imageId: number;
  title: string;
  category: string;
  likes: number;
  publisherId: string;
  describtion: string;
  index: number;
}

function ImageItem({
  image,
  imageId,
  category,
  likes,
  index,
  describtion,
  publisherId,
  title,
}: ImageItemProps) {
  // Get the publisher of the image (happens via a join in the Supabase tables and we get the data)
  const { data: publisher } = useFetchPublisherInfo(publisherId || "");

  // Mutation functions for image actions
  const { bookmark } = useBookMarkImage();
  const { toggleLike } = useLikeImage();

  // Get the current signed in user
  const { data: user } = useUser();

  // check if the user has liked or bookmarked this image before
  const isAlreadyLiked = user?.user_metadata?.liked_images?.includes(imageId);
  const isAlreadySaved = user?.user_metadata?.saved_images?.includes(imageId);

  // Ths function offers better performance by resizing images
  const sizes = getResponsiveImageSizes(image);

  // Only first images are "eager" loaded. The rest is "lazy" loaded
  const isLCPImage = index < 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/image-details/${imageId}`}
        className="min-w-[286px] relative group focus:outline-none"
      >
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img
            src={sizes.mobile}
            srcSet={`
                  ${sizes.mobile} 500w,
                  ${sizes.tablet} 1000w,
                  ${sizes.desktop} 1500w
                `}
            sizes="(max-width: 640px) 500px, (max-width: 1024px) 1000px, 1500px"
            loading={isLCPImage ? "eager" : "lazy"}
            fetchPriority={isLCPImage ? "high" : "auto"}
            alt={describtion}
            className="rounded-xl transition-all duration-500 group-hover:scale-110 group-focus:scale-115 max-h-72 min-h-72 w-full object-cover group-focus:brightness-50"
          />

          {/* Image info on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4"
          >
            {/* Image Actions */}
            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                tabIndex={-1}
                aria-label="Like this image"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isAlreadyLiked ? "bg-red-600" : "bg-white/40"
                }`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleLike(imageId);
                }}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isAlreadyLiked ? "fill-white stroke-white" : ""
                  }`}
                  aria-hidden="true"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                tabIndex={-1}
                aria-label="Bookmark this image"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isAlreadySaved ? "bg-green-600" : "bg-white/40"
                }`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  e.preventDefault();
                  bookmark(imageId);
                }}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    isAlreadySaved ? "fill-white stroke-white" : ""
                  }`}
                  aria-hidden="true"
                />
              </motion.button>
            </div>

            {/* Bottom Info */}
            <div className="text-white">
              <h2 className="text-lg mb-1 line-clamp-1">{title}</h2>
              <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                {describtion}
              </p>
            </div>
          </motion.div>
        </div>

        <span className="flex px-3 py-1 text-xs text-white absolute left-3 top-[0.85rem] rounded-full bg-black/50 backdrop-blur-sm">
          {category}
        </span>

        {/* Image footer */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* Publisher image */}
            <img
              src={optimizeAvatarUrl(publisher?.at(0)?.avatar || GuestImage)}
              loading="lazy"
              className="h-[26px] w-[26px] rounded-full"
              alt="Publisher image"
            />
            <span className="text-(--nav-links-color) text-sm">
              {publisher?.at(0)?.user_name || "loading..."}
            </span>
          </div>

          <div className="flex items-center gap-1 text-(--input-placeholder)">
            <Heart size={16} aria-hidden="true" />
            <span className="text-sm">{likes}</span>
          </div>
        </div>

        <p className="text-(--text-color) max-w-full overflow-auto scrollbar-thin">
          {title}
        </p>
      </Link>
    </motion.div>
  );
}

export default ImageItem;
