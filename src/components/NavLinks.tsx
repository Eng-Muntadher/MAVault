import { AlertCircle, Compass, Home, Upload } from "lucide-react";
import { NavLink } from "react-router-dom";

const navLinkBase =
  "flex gap-2 items-center transition-and-focus-ring hover:text-(--nav-links-hover)";

function NavLinks() {
  return (
    <div className="text-(--nav-links-color) flex gap-6 justify-center max-[890px]:hidden">
      <NavLink
        to="home"
        className={({ isActive }) =>
          `${navLinkBase} ${isActive ? "text-(--nav-links-hover)" : ""}`
        }
      >
        <span aria-hidden="true">
          <Home size={16} />
        </span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="explore?sortBy=Trending&category=All"
        className={({ isActive }) =>
          `${navLinkBase} ${isActive ? "text-(--nav-links-hover)" : ""}`
        }
      >
        <span aria-hidden="true">
          <Compass size={16} />
        </span>
        <span>Explore</span>
      </NavLink>

      <NavLink
        to="upload"
        className={({ isActive }) =>
          `${navLinkBase} ${isActive ? "text-(--nav-links-hover)" : ""}`
        }
      >
        <span aria-hidden="true">
          <Upload size={16} />
        </span>
        <span>Upload</span>
      </NavLink>

      <NavLink
        to="about"
        className={({ isActive }) =>
          `${navLinkBase} ${isActive ? "text-(--nav-links-hover)" : ""}`
        }
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
