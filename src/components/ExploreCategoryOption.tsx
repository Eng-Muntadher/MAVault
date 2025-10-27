import { type LucideIcon } from "lucide-react";

interface ExploreCategoryOptionProps {
  icon: LucideIcon;
  name: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function ExploreCategoryOption({
  icon: Icon,
  name,
  count,
  isSelected,
  onClick,
}: ExploreCategoryOptionProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer select-none
        ${
          isSelected
            ? "btn-bg text-white"
            : "border border-gray-200 hover:bg-gray-200 text-[--nav-links-color]"
        }`}
    >
      <Icon size={16} aria-hidden={true} />

      <span className="capitalize">{name}</span>

      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-lg
          ${
            isSelected
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-[--text-color]"
          }`}
      >
        {count}
      </span>
    </button>
  );
}
