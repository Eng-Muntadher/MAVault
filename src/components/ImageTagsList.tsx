import ImageTag from "./ImageTag";

function ImageTagsList({ tags }: { tags: string }) {
  const tagsList = tags?.split(",");

  return (
    <ul className="flex gap-2 flex-wrap">
      {tagsList?.map((tag) => (
        <ImageTag key={tag} tag={tag} />
      ))}
    </ul>
  );
}

export default ImageTagsList;
