function ImageTag({ tag }: { tag: string }) {
  return (
    <li className="py-1 px-3 text-(--tag-text-color) text-sm bg-(--pallete-bg) rounded-full">
      {tag}
    </li>
  );
}

export default ImageTag;
