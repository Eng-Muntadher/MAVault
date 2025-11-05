function ImageTag({ tag }: { tag: string }) {
  return (
    <li className="py-1 px-3 text-[#364153] text-sm bg-[#F3F4F6] rounded-full">
      {tag}
    </li>
  );
}

export default ImageTag;
