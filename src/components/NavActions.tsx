import type { User } from "@supabase/supabase-js";
import { Menu, Moon, Search } from "lucide-react";
import { Link } from "react-router-dom";
import guestImage from "../assets/guest.jpeg";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

interface NavActionsProps {
  openCommandPallete: () => void;
  openMobileNavBar: () => void;
  user: User | null;
}

function NavActions({
  openCommandPallete,
  openMobileNavBar,
  user,
}: NavActionsProps) {
  // get the user data if there is a signed in user
  const { data: userData } = useGetUserInfo(user?.id || "");

  return (
    <div className="flex gap-3 items-center justify-end">
      {/* Command Pallete */}
      <button
        aria-label="Open Command Palette"
        onClick={openCommandPallete}
        className="flex items-center gap-2 text-(--input-placeholder) px-2 py-1.5 rounded-[0.625rem] bg-(--input-color) text-xs w-[126.6px] cursor-pointer max-xl:hidden hover:text-gray-900 hover:bg-gray-200"
      >
        <span>
          <Search size={16} aria-hidden="true" />
        </span>
        <span>Search</span>

        <div className="border border-[#D1D5DC] px-2 py-0.5 rounded-sm bg-(--text-color-2)">
          <span className="txt" aria-hidden="true">
            ⌘K
          </span>
        </div>
      </button>

      {/* Dark mode toggle */}
      <button className="w-9 h-9 flex items-center justify-center cursor-pointer text-(--text-color) hover:bg-[#e9ebef] rounded-full">
        <Moon size={16} />
      </button>

      {/* Auth buttons */}
      {user ? (
        <Link to="/user-profile/9" className="max-[890px]:hidden">
          <img
            src={userData?.at(0)?.avatar || guestImage}
            alt="User image"
            aria-label="Navigate to profile page"
            className="w-8 h-8 cursor-pointer max-[890px]:hidden rounded-full transition-all duration-300 hover:brightness-75 hover:scale-110"
          />
        </Link>
      ) : (
        <>
          <Link
            to="/sign-in"
            className="text-sm font-semibold px-4 py-2 cursor-pointer max-[890px]:hidden text-(--text-color) hover:bg-[#e9ebef] rounded-md"
          >
            Sign In
          </Link>

          <Link
            to="/sign-up"
            className="btn-bg text-(--text-color-2) font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer max-[890px]:hidden"
          >
            Sign Up
          </Link>
        </>
      )}

      {/* Burger icon shown on smaller screens */}
      <button
        className="w-9 h-9 justify-center items-center rounded-md max-[890px]:flex min-[890px]:hidden cursor-pointer text-(--text-color) hover:bg-[#e9ebef]"
        onClick={openMobileNavBar}
      >
        <Menu size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default NavActions;
