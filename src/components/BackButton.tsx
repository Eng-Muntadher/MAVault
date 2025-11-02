import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  text: string;
  addedClasses?: string;
}

function BackButton({ text, addedClasses }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      aria-label="Go back to previous page"
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 text-(--text-color) text-sm font-semibold cursor-pointer hover:text-(--nav-links-hover) ${addedClasses}`}
    >
      <span>
        <ArrowLeft size={16} aria-hidden="true" />
      </span>
      <span>{text}</span>
    </button>
  );
}

export default BackButton;
