import { useState } from "react";
import Logo from "./Logo";
import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import { CommandPalette } from "./CommandPalette";
import MobileNavMenu from "./MobileNavMenu";
import { useUser } from "../hooks/useUser";

function NavBar() {
  // Command Pallete shown on larger screens
  const [isOpenCommandPalette, setIsOpenCommandPallete] = useState(false);

  // Mobile Navigation shown on smaller screens
  const [isOpenNav, setIsOpenNav] = useState(false);

  // Only if there is a logged in user, we display the nav links
  const { data: user } = useUser();

  return (
    <header>
      <nav className="h-16 grid grid-cols-3 items-center px-4 sm:px-6 lg:px-6 max-[890px]:grid-cols-2">
        <Logo />
        <NavLinks />
        <NavActions
          openCommandPallete={() => setIsOpenCommandPallete(true)}
          openMobileNavBar={() => setIsOpenNav(true)}
          user={user || null}
        />
        <CommandPalette
          open={isOpenCommandPalette}
          onOpenChange={setIsOpenCommandPallete}
          user={user || null}
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
