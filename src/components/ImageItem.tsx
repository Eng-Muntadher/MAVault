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
import { memo } from "react";

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

  // Only first image is "eager" loaded. The rest is "lazy" loaded
  const isLCPImage = index === 0;

  return (
    <motion.div
      initial={index < 4 ? { opacity: 0, y: 20 } : false}
      animate={index < 4 ? { opacity: 1, y: 0 } : false}
      transition={index < 4 ? { duration: 0.3 } : undefined}
      className="transition-transform duration-300 ease-out hover:-translate-y-2"
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={isLCPImage ? "eager" : "lazy"}
            fetchPriority={isLCPImage ? "high" : "auto"}
            alt={title}
            width={2000}
            height={2667}
            className="rounded-xl transition-all duration-500 group-hover:scale-105 group-focus:scale-115 object-cover group-focus:brightness-50 will-change-transform h-[538.2px]"
          />

          <span className="flex px-3 py-1 text-xs text-white absolute left-3 top-[0.85rem] rounded-full bg-black/50 backdrop-blur-sm z-50">
            {category}
          </span>

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

        {/* Image footer */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* Publisher image */}
            <img
              src={
                publisher?.at(0).avatar
                  ? optimizeAvatarUrl(publisher[0].avatar)
                  : GuestImage
              }
              loading="lazy"
              alt="Publisher image"
              width={26}
              height={26}
              decoding="async"
              className="h-[26px] w-[26px] rounded-full object-cover"
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

export default memo(ImageItem);
