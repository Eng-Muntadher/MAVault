import { Menu, Moon, Search } from "lucide-react";

function NavActions() {
  return (
    <div className="flex gap-3 items-center justify-end">
      <button
        aria-label="Open Command Palette"
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

      <button className="w-9 h-9 flex items-center justify-center cursor-pointer text-(--text-color) hover:bg-[#e9ebef] rounded-full">
        <Moon size={16} />
      </button>

      <button className="text-sm font-semibold px-4 py-2 cursor-pointer max-[890px]:hidden text-(--text-color) hover:bg-[#e9ebef] rounded-md">
        Sign In
      </button>

      <button className="btn-bg text-(--text-color-2) font-semibold text-sm px-4 py-2 rounded-lg cursor-pointer max-[890px]:hidden">
        Sign Up
      </button>

      <button className="w-9 h-9 justify-center items-center rounded-md max-[890px]:flex min-[890px]:hidden cursor-pointer text-(--text-color) hover:bg-[#e9ebef]">
        <Menu size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default NavActions;
