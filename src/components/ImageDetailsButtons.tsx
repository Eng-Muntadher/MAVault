import { Bookmark, Download, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useLikeImage } from "../hooks/useLikeImage";
import { useUser } from "../hooks/useUser";
import { useBookMarkImage } from "../hooks/useBookMarkImage";

interface ImageDetailsButtonsProps {
  likes: number;
  title: string;
  url: string;
  imageId: number;
}

const buttonClasses =
  "flex items-center text-(--text-color) gap-2 bg-(--pagination-btn-bg) hover:bg-(--command-pallete-hover) rounded-lg border border-black/10  py-2 px-3 text-sm font-semibold disabled:bg-gray-400 cursor-pointer transition-and-focus-ring ";

function ImageDetailsButtons({
  likes,
  title,
  url,
  imageId,
}: ImageDetailsButtonsProps) {
  // Mutation functions for image actions
  const { toggleLike, isPending } = useLikeImage();
  const { bookmark, isPending: isSaving } = useBookMarkImage();

  // Get the current signed in user (if there is one)
  const { data } = useUser();

  // check if the user liked/bookmarked this image before
  const isAlreadyLiked = data?.user_metadata?.liked_images?.includes(imageId);
  const isAlreadySaved = data?.user_metadata?.saved_images?.includes(imageId);

  // download the image action
  async function handleDownload(url: string, title: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  }

  // copy URL to clipboard action
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Image URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.log(err);
    }
  };

  const buttons = [
    {
      icon: Heart,
      label: `Likes (${likes ?? "..."})`,
      aria: `Like this image, ${likes} likes`,
      addedClasses: `${
        isAlreadyLiked ? "bg-red-600 text-white hover:bg-red-700" : ""
      } `,
      onClick: () => {
        toggleLike(imageId);
      },
    },
    {
      icon: Bookmark,
      label: `${isAlreadySaved ? "Saved" : "Save"}`,
      aria: "Save this image",
      addedClasses: `${
        isAlreadySaved ? "bg-green-600 text-white hover:bg-green-700" : ""
      }`,
      onClick: () => {
        bookmark(imageId);
      },
    },
    {
      icon: Download,
      label: "Download",
      aria: "Download this image",
      onClick: () => handleDownload(url, title),
    },
    {
      icon: Share2,
      label: "Share",
      aria: "Share this image",
      onClick: handleCopy,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="my-6 flex gap-3 flex-wrap"
      role="group"
      aria-label="Image actions"
    >
      {buttons.map(
        ({ icon: Icon, label, aria, onClick, addedClasses }, index) => (
          <button
            key={label}
            className={
              index === 0 || index === 1
                ? buttonClasses + addedClasses
                : buttonClasses
            }
            aria-label={aria}
            onClick={onClick}
            disabled={
              index === 0 ? isPending : index === 1 ? isSaving : undefined
            }
          >
            <Icon
              size={16}
              aria-hidden="true"
              className={`${
                index === 0
                  ? isAlreadyLiked && "fill-current"
                  : index === 1
                  ? isAlreadySaved && "fill-current"
                  : ""
              }`}
            />
            {label}
          </button>
        )
      )}
    </motion.div>
  );
}

export default ImageDetailsButtons;
