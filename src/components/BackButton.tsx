import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  text: string;
  addedClasses?: string;
  to?: string;
}

function BackButton({ text, addedClasses, to }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      aria-label="Go back to previous page"
      onClick={() => {
        if (to) {
          navigate(to);
        } else navigate(-1);
      }}
      className={`flex items-center gap-2 text-(--text-color) text-sm font-semibold cursor-pointer hover:text-(--nav-links-hover) transition-and-focus-ring ${addedClasses}`}
    >
      <span>
        <ArrowLeft size={16} aria-hidden="true" />
      </span>
      <span>{text}</span>
    </button>
  );
}

export default BackButton;
