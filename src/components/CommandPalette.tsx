import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Home,
  Info,
  Upload,
  User,
  Settings,
  Moon,
  //   Sun,
  Search,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Command {
  label: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const allCommands: Command[] = [
    {
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      onSelect: () => navigate("/"),
    },
    {
      label: "Explore",
      icon: <Compass className="w-5 h-5" />,
      onSelect: () => navigate("/explore"),
    },
    {
      label: "Upload Image",
      icon: <Upload className="w-5 h-5" />,
      onSelect: () => navigate("/upload"),
    },
    {
      label: "My Profile",
      icon: <User className="w-5 h-5" />,
      onSelect: () => navigate("/user-profile/9"),
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      onSelect: () => navigate("/user-settings/9"),
    },
    {
      label: "About",
      icon: <Info className="w-5 h-5" />,
      onSelect: () => navigate("/about"),
    },
    {
      label: "Toggle Theme",
      icon: <Moon className="w-5 h-5" />,
      onSelect: () => document.documentElement.classList.toggle("dark"),
    },
  ];

  // Filter results upon search
  const filteredCommands = allCommands.filter((command) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return command.label.toLowerCase().includes(query);
  });

  // Focus the input when the component first opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setSearchQuery("");
    }
  }, [open]);

  // close if Escape key is pressed
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const handleSelect = (command: Command) => {
    onOpenChange(false);
    setTimeout(() => command.onSelect(), 100);
  };

  const handleBackdropClick = () => {
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="rounded-xl border border-border/50 bg-linear-to-b from-white to-gray-50 shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-gray-300 px-4 py-4 bg-white/50 backdrop-blur-sm">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Command List */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No commands found.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((command, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(command)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-[#e9ebef] cursor-pointer hover:shadow-sm active:scale-[0.98] group"
                      >
                        <span className="text-muted-foreground group-hover:text-accent-foreground transition-colors">
                          {command.icon}
                        </span>
                        <span className="flex-1 text-left text-foreground group-hover:text-accent-foreground">
                          {command.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
