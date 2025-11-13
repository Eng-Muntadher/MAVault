import { Github, Globe, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="grid grid-cols-3 mb-8 max-md:grid-cols-1 max-md:gap-8">
        <div className="text-center">
          <h2 className="text-(--text-color) text-sm mb-3">Portfolio</h2>
          <a
            href="https://linkedin.com"
            className="flex gap-2 justify-center items-center text-(--input-placeholder) text-sm hover:text-(--nav-links-hover) transition-and-focus-ring"
          >
            <Globe size={16} aria-hidden="true" />
            <span>MuntadherAhmed.com</span>
          </a>
        </div>

        <div className="text-center">
          <h2 className="text-(--text-color) text-sm mb-3">GitHub</h2>
          <a
            href="https://linkedin.com"
            className="flex gap-2 justify-center items-center text-(--input-placeholder) text-sm hover:text-(--nav-links-hover) transition-and-focus-ring"
          >
            <Github size={16} aria-hidden="true" />
            <span>Eng-Muntadher.com</span>
          </a>
        </div>

        <div className="text-center">
          <h2 className="text-(--text-color) text-sm mb-3">Email</h2>
          <a
            href="mailto:Muntadheralshammari@gmail.com"
            className="flex gap-2 justify-center items-center text-(--input-placeholder) text-sm hover:text-(--nav-links-hover) transition-and-focus-ring"
          >
            <Mail size={16} aria-hidden="true" />
            <span>Muntadheralshammari@gmail.com</span>
          </a>
        </div>
      </div>

      <hr className="flex px-20 pt-[0.05rem] border-t border-(--border-color) mb-8" />

      <div className="text-center text-(--input-placeholder)">
        <p>© 2025 MAVault. All rights reserved.</p>
        <p className="text-sm text-[#6A7282] mt-1">
          Created by Muntadher Ahmed
        </p>
      </div>
    </footer>
  );
}

export default Footer;
