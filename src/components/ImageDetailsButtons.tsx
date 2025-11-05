import { Bookmark, Download, Heart, Share2 } from "lucide-react";

const buttonClasses =
  "flex items-center gap-2 rounded-lg border border-black/10  py-2 px-3 text-sm font-semibold hover:bg-[#e9ebef] cursor-pointer transition-all";

function ImageDetailsButtons() {
  const buttons = [
    { icon: Heart, label: "Likes (234)", aria: "Like this image, 234 likes" },
    { icon: Bookmark, label: "Save", aria: "Save this image" },
    { icon: Download, label: "Download", aria: "Download this image" },
    { icon: Share2, label: "Share", aria: "Share this image" },
  ];

  return (
    <div
      className="my-6 flex gap-3 flex-wrap"
      role="group"
      aria-label="Image actions"
    >
      {buttons.map(({ icon: Icon, label, aria }) => (
        <button key={label} className={buttonClasses} aria-label={aria}>
          <Icon size={16} aria-hidden="true" /> {label}
        </button>
      ))}
    </div>
  );
}

export default ImageDetailsButtons;
