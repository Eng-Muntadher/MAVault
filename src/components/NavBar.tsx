import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { CommandPalette } from "./CommandPalette";
import { useDarkMode } from "../hooks/useDarkMode";
import Logo from "./Logo";
import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import MobileNavMenu from "./MobileNavMenu";

function NavBar() {
  // Command Pallete shown on larger screens
  const [isOpenCommandPalette, setIsOpenCommandPallete] = useState(false);

  // Mobile Navigation shown on smaller screens
  const [isOpenNav, setIsOpenNav] = useState(false);

  const { data: user } = useUser();

  const { toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-(--filters-bg)">
      <nav className="h-16 grid grid-cols-3 items-center px-4 sm:px-6 lg:px-6 max-[890px]:grid-cols-2 border-b-2 border-(--border-color) backdrop-blur-md">
        <Logo />
        <NavLinks />
        <NavActions
          openCommandPallete={() => setIsOpenCommandPallete(true)}
          openMobileNavBar={() => setIsOpenNav(true)}
          user={user || null}
          toggleDarkMode={toggleDarkMode}
        />
        <CommandPalette
          open={isOpenCommandPalette}
          onOpenChange={setIsOpenCommandPallete}
          user={user || null}
          toggleDarkMode={toggleDarkMode}
        />
        <MobileNavMenu
          open={isOpenNav}
          onOpenChange={setIsOpenNav}
          user={user || null}
        />
      </nav>
    </header>
  );
}

export default NavBar;
