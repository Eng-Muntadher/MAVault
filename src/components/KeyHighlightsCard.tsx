import { type LucideIcon } from "lucide-react";

interface KeyHighlightsCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}
function KeyHighlightsCard({
  icon: Icon,
  title,
  text,
}: KeyHighlightsCardProps) {
  return (
    <li className="flex gap-4 rounded-[0.875rem] border-2 border-(--border-color) bg-(--text-color-2) p-[1.6rem]">
      <div className="purple-bg p-2 rounded-[0.625rem] h-10 w-10 flex items-center text-white">
        <Icon size={24} aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-(--text-color) mb-2">{title}</h3>
        <p className="text-(--input-placeholder) text-sm">{text}</p>
      </div>
    </li>
  );
}

export default KeyHighlightsCard;
