import { AlertCircle, Compass, Home, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div className="text-(--nav-links-color) flex gap-6 justify-center max-[890px]:hidden">
      <NavLink
        to="/"
        className="flex gap-2 items-center hover:text-(--nav-links-hover)"
      >
        <span aria-hidden="true">
          <Home size={16} />
        </span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="explore"
        className="flex gap-2 items-center hover:text-(--nav-links-hover)"
      >
        <span aria-hidden="true">
          <Compass size={16} />
        </span>
        <span>Explore</span>
      </NavLink>

      <NavLink
        to="upload"
        className="flex gap-2 items-center hover:text-(--nav-links-hover)"
      >
        <span aria-hidden="true">
          <Upload size={16} />
        </span>
        <span>Upload</span>
      </NavLink>

      <NavLink
        to="about"
        className="flex gap-2 items-center hover:text-(--nav-links-hover)"
      >
        <span aria-hidden="true">
          <AlertCircle size={16} />
        </span>
        <span>About</span>
      </NavLink>
    </div>
  );
}

export default NavLinks;
