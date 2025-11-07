import { useState } from "react";
import Logo from "./Logo";
import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import { CommandPalette } from "./CommandPalette";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <nav className="h-16 grid grid-cols-3 items-center px-4 sm:px-6 lg:px-6 max-[890px]:grid-cols-2">
        <Logo />
        <NavLinks />
        <NavActions openCommandPallete={() => setIsOpen(true)} />
        <CommandPalette open={isOpen} onOpenChange={setIsOpen} />
      </nav>
    </header>
  );
}

export default NavBar;
