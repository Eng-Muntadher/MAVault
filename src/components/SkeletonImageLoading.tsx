interface ImagePlaceholderProps {
  heightClass?: string;
  widthClass?: string;
  addedClasses?: string;
}

function SkeletonImageLoading({
  heightClass = "h-50",
  widthClass = "w-full",
  addedClasses,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${widthClass} ${heightClass} ${addedClasses} relative overflow-hidden rounded-xl`}
    >
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>
  );
}

export default SkeletonImageLoading;
