import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/" className="flex gap-2 items-center w-fit">
        <div className="p-2 purple-bg rounded-[0.625rem]">
          <Camera
            size={24}
            className="text-(--text-color-2)"
            aria-hidden="true"
          />
        </div>
        <span className="text-xl text">MAVault</span>
      </Link>
    </div>
  );
}

export default Logo;
