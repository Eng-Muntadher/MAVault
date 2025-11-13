import { type LucideIcon } from "lucide-react";

interface ExploreImagesFilterOptionProps {
  icon: LucideIcon;
  name: string;
  isSelected: boolean;
  onClick: () => void;
  addedClasses?: string;
}
function ExploreImagesFilterOption({
  icon: Icon,
  name,
  isSelected,
  onClick,
  addedClasses,
}: ExploreImagesFilterOptionProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      role="radio"
      className={`flex items-center justify-center w-1/3 gap-2 p-1.5 cursor-pointer rounded-[0.875rem] transition-and-focus-ring ${
        isSelected ? "bg-(--text-color-2)" : ""
      }`}
    >
      <span aria-hidden="true">
        <Icon size={16} />
      </span>
      <span className={addedClasses}>{name}</span>
    </button>
  );
}

export default ExploreImagesFilterOption;
