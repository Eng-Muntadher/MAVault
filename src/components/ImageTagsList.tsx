import ImageTag from "./ImageTag";

function ImageTagsList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <ImageTag key={tag} tag={tag} />
      ))}
    </ul>
  );
}

export default ImageTagsList;
