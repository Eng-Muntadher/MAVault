import { csvToArray } from "../services/imagesApi";
import ImageTag from "./ImageTag";

function ImageTagsList({ tags }: { tags: string }) {
  const tagsList = csvToArray(tags);

  return (
    <ul className="flex gap-2 flex-wrap w-full max-h-7 overflow-x-auto scrollbar-thin">
      {tagsList?.map((tag) => (
        <ImageTag key={tag} tag={tag} />
      ))}
    </ul>
  );
}

export default ImageTagsList;
