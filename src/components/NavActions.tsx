import type { User } from "@supabase/supabase-js";
import { Menu, Moon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import guestImage from "../assets/guest.jpeg";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useEffect } from "react";

interface NavActionsProps {
  openCommandPallete: () => void;
  openMobileNavBar: () => void;
  user: User | null;
  toggleDarkMode: () => void;
}

function NavActions({
  openCommandPallete,
  openMobileNavBar,
  user,
  toggleDarkMode,
}: NavActionsProps) {
  // get the user data if there is a signed in user
  const { data: userData } = useGetUserInfo(user?.id || "");

  /* Opens the command palette via the keyboard shortcut (Ctrl+K on Windows/Linux, ⌘+K on macOS)
     and prevents default browser actions */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect Mac devices vs others
      const isMac = /Mac/i.test(navigator.userAgent);

      if (
        (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        openCommandPallete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openCommandPallete]);

  return (
    <div className="flex gap-3 items-center justify-end">
      {/* Command Pallete */}
      <button
        aria-label="Open Command Palette"
        onClick={openCommandPallete}
        className="flex items-center gap-2 text-(--input-placeholder) px-2 py-1.5 rounded-[0.625rem] bg-(--pallete-bg) text-xs w-[126.6px] cursor-pointer max-xl:hidden hover:text-(--command-pallete-text-hover) hover:bg-(--command-pallete-hover) transition-and-focus-ring"
      >
        <span>
          <Search size={16} aria-hidden="true" />
        </span>
        <span>Search</span>

        <div className="border border-(--drag-upload-border) px-2 py-0.5 rounded-sm bg-(--text-color-2)">
          <span className="txt" aria-hidden="true">
            ⌘K
          </span>
        </div>
      </button>

      {/* Dark mode toggle */}
      <button
        aria-label="Toggle Dark mode"
        onClick={toggleDarkMode}
        className="w-9 h-9 flex items-center justify-center cursor-pointer text-(--text-color) hover:bg-(--border-color) rounded-full transition-and-focus-ring"
      >
        <Moon size={16} aria-hidden="true" />
      </button>

      {/* Auth buttons */}
      {user ? (
        <Link
          to="/user-profile"
          aria-label="Go to profile page"
          className="max-[890px]:hidden transition-and-focus-ring rounded-full"
        >
          <img
            src={userData?.at(0)?.avatar || guestImage}
            alt="User image"
            aria-label="Navigate to profile page"
            className="w-8 h-8 cursor-pointer max-[890px]:hidden rounded-full transition-all duration-300 hover:brightness-75 hover:scale-110 object-cover"
          />
        </Link>
      ) : (
        <>
          <Link
            to="/sign-in"
            className="text-sm font-semibold px-4 py-2 cursor-pointer max-[890px]:hidden text-(--text-color) hover:bg-(--border-color) rounded-md transition-and-focus-ring"
          >
            Sign In
          </Link>

          <Link
            to="/sign-up"
            className="btn-bg text-(--text-color-2) font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer max-[890px]:hidden transition-and-focus-ring"
          >
            Sign Up
          </Link>
        </>
      )}

      {/* Burger icon shown on smaller screens */}
      <button
        aria-label="Open navigation menu"
        className="w-9 h-9 justify-center items-center rounded-md max-[890px]:flex min-[890px]:hidden cursor-pointer text-(--text-color) hover:bg-(--border-color)"
        onClick={openMobileNavBar}
      >
        <Menu size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default NavActions;
