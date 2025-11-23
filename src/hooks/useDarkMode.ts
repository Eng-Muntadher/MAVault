import { useLayoutEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");

      if (stored === "dark") return true;
      if (stored === "light") return false;

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (darkMode) {
      el.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      el.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return { darkMode, toggleDarkMode };
}
