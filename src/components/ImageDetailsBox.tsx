import { motion } from "framer-motion";
import { Calendar, Eye } from "lucide-react";
import userImage from "../assets/guest.jpeg";
import ImageTagsList from "./ImageTagsList";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

interface ImageDetailsBoxProps {
  title: string;
  describtion: string;
  date: string;
  views: number;
  tags: string;
  publisherId: string;
  dimensions: string;
}
function ImageDetailsBox({
  title,
  describtion,
  date,
  views,
  tags,
  publisherId,
  dimensions,
}: ImageDetailsBoxProps) {
  const { data } = useGetUserInfo(publisherId);
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      aria-label="image details"
      className="flex flex-col gap-4 p-6 rounded-[0.875rem] border border-(--border-color) bg-(--comments-section-bg) min-[1140px]:w-96 min-h-[555px] h-fit sticky top-8 z-10 max-[1140px]:max-w-full max-[1140px]:mb-8"
    >
      <h1 className="text-(--text-color) text-2xl max-w-full max-h-9 overflow-auto scrollbar-thin">
        {title}
      </h1>

      <p className="text-(--input-placeholder) max-w-full max-h-9 overflow-auto scrollbar-thin">
        {describtion}
      </p>

      <div>
        <h2 className="text-[#6A7282] text-sm mb-3">Uploaded by</h2>
        <div className="flex gap-3">
          <img
            src={data?.at(0)?.avatar || userImage}
            className="w-12 h-12 rounded-full object-cover"
            alt=""
          />
          <div className="flex flex-col">
            <strong className="block text-(--text-color) text-sm font-normal">
              {data?.at(0)?.user_name}
            </strong>
            <span className="text-[#6A7282] text-xs">Creator</span>
          </div>
        </div>
      </div>
      <hr
        className="border-0 h-[0.5px] bg-(--border-color)"
        role="presentation"
      />

      <div>
        <div className="flex gap-3 text-(--input-placeholder) mb-4 items-center">
          <Calendar size={20} aria-hidden="true" />
          <div>
            <span className="block text-[#6A7282] text-xs">Published</span>
            <time dateTime="" className="text-sm">
              {date}
            </time>
          </div>
        </div>

        <div className="flex gap-3 text-(--input-placeholder) items-center">
          <Eye size={20} aria-hidden="true" />
          <div>
            <span className="block text-[#6A7282] text-xs">Views</span>
            <span className="text-sm">{views}</span>
          </div>
        </div>
      </div>

      <hr
        className="border-0 h-[0.5px] bg-(--border-color) mb-2"
        role="presentation"
      />

      <div>
        <h3 className="text-[#6A7282] text-sm mb-3">Tags</h3>

        <ImageTagsList tags={tags} />
      </div>

      <hr
        className="border-0 h-[0.5px] bg-(--border-color) mb-2"
        role="presentation"
      />

      <div>
        <h4 className="text-[#6A7282] text-sm">Dimensions</h4>
        <span className="text-(--text-color) text-sm">
          {dimensions === undefined
            ? "loading"
            : dimensions === null
            ? "Unknown"
            : dimensions}
        </span>
      </div>
    </motion.section>
  );
}

export default ImageDetailsBox;
