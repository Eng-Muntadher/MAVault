import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ImageItemProps {
  image: string;
  artistImage: string;
  category: string;
  artist: string;
  likes: number;
  describtion: string;
}
function ImageItem({
  image,
  artistImage,
  category,
  artist,
  likes,
  describtion,
}: ImageItemProps) {
  return (
    <Link to="/image-details/:9" className="min-w-[286px] relative">
      <img src={image} className="rounded-xl mb-3" />

      <span className="flex px-3 py-1 text-xs text-(--text-color-2) absolute left-3 top-[0.85rem] rounded-full bg-black/50 backdrop-blur-sm">
        {category}
      </span>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={artistImage}
            className="h-[26px] w-[26px] rounded-full"
            alt={describtion}
          />
          <span className="text-(--nav-links-color) text-sm">{artist}</span>
        </div>

        <div className="flex items-center gap-1 text-(--input-placeholder)">
          <Heart size={16} aria-hidden="true" />
          <span className="text-sm">{likes}</span>
        </div>
      </div>

      <p className="text-(--text-color)">{describtion}</p>
    </Link>
  );
}

export default ImageItem;
