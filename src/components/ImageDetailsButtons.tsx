import { Bookmark, Download, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface ImageDetailsButtonsProps {
  likes: number;
  title: string;
  url: string;
}

const buttonClasses =
  "flex items-center gap-2 rounded-lg border border-black/10  py-2 px-3 text-sm font-semibold hover:bg-[#e9ebef] cursor-pointer transition-all";

function ImageDetailsButtons({ likes, title, url }: ImageDetailsButtonsProps) {
  async function handleDownload(url: string, title: string) {
    console.log("siii");
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
      label: `Likes (${likes})`,
      aria: `Like this image, ${likes} likes`,
      onClick: () => {
        console.log("saved!");
      },
    },
    {
      icon: Bookmark,
      label: "Save",
      aria: "Save this image",
      onClick: () => {
        console.log("saved!");
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
      {buttons.map(({ icon: Icon, label, aria, onClick }) => (
        <button
          key={label}
          className={buttonClasses}
          aria-label={aria}
          onClick={onClick}
        >
          <Icon size={16} aria-hidden="true" /> {label}
        </button>
      ))}
    </motion.div>
  );
}

export default ImageDetailsButtons;
