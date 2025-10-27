import { type LucideIcon } from "lucide-react";

interface ExploreImagesFilterOptionProps {
  icon: LucideIcon;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}
function ExploreImagesFilterOption({
  icon: Icon,
  name,
  isSelected,
  onClick,
}: ExploreImagesFilterOptionProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      role="radio"
      className={`flex items-center justify-center w-1/3 gap-2 p-1.5 cursor-pointer ${
        isSelected ? "bg-white" : ""
      } rounded-[0.875rem]`}
    >
      <span aria-hidden="true">
        <Icon size={16} />
      </span>
      <span>{name}</span>
    </button>
  );
}

export default ExploreImagesFilterOption;
