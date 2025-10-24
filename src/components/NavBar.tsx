import Logo from "./Logo";
import NavActions from "./NavActions";
import NavLinks from "./NavLinks";

function NavBar() {
  return (
    <header>
      <nav className="h-16 grid grid-cols-3 items-center px-4 sm:px-6 lg:px-6 max-[890px]:grid-cols-2">
        <Logo />
        <NavLinks />
        <NavActions />
      </nav>
    </header>
  );
}

export default NavBar;
