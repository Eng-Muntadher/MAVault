import userImage from "../assets/guest.jpeg";
import { Calendar, Eye } from "lucide-react";
import ImageTagsList from "./ImageTagsList";

function ImageDetailsBox() {
  return (
    <section
      aria-label="image details"
      className="flex flex-col gap-4 p-6 rounded-[0.875rem] border border-[rgba(0,0,0,0.10)] bg-white max-w-96 h-fit sticky top-8 z-10 max-[1140px]:max-w-full max-[1140px]:mb-8"
    >
      <h1 className="text-(--text-color) text-2xl">Modern Architecture</h1>

      <p className="text-(--input-placeholder)">
        A stunning view of contemporary architecture with clean lines and
        geometric shapes
      </p>

      <div>
        <h2 className="text-[#6A7282] text-sm mb-3">Uploaded by</h2>
        <div className="flex gap-3">
          <img src={userImage} className="w-12 h-12 rounded-full" alt="" />
          <div className="flex flex-col">
            <strong className="block text-(--text-color) text-sm font-normal">
              johndoe
            </strong>
            <span className="text-[#6A7282] text-xs">Creator</span>
          </div>
        </div>
      </div>
      <hr className="border-0 h-[0.5px] bg-black/10" role="presentation" />

      <div>
        <div className="flex gap-3 text-(--input-placeholder) mb-4 items-center">
          <Calendar size={20} aria-hidden="true" />
          <div>
            <span className="block text-[#6A7282] text-xs">Published</span>
            <time dateTime="" className="text-sm">
              October 1, 2025
            </time>
          </div>
        </div>

        <div className="flex gap-3 text-(--input-placeholder) items-center">
          <Eye size={20} aria-hidden="true" />
          <div>
            <span className="block text-[#6A7282] text-xs">Views</span>
            <span className="text-sm">1670</span>
          </div>
        </div>
      </div>

      <hr className="border-0 h-[0.5px] bg-black/10 mb-2" role="presentation" />

      <div>
        <h3 className="text-[#6A7282] text-sm mb-3">Tags</h3>

        <ImageTagsList
          tags={["architecture", "modern", "building", "design"]}
        />
      </div>

      <hr className="border-0 h-[0.5px] bg-black/10 mb-2" role="presentation" />

      <div>
        <h4 className="text-[#6A7282] text-sm">Dimensions</h4>
        <span className="text-(--text-color) text-sm">1080 × 720 px</span>
      </div>
    </section>
  );
}

export default ImageDetailsBox;
