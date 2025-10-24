import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* This is a reusable custom select element. The state it sets can be
   a normal local state for any element and a state setter function must be passed */

interface SelectOptions {
  optionsArray: string[];
  onChange: (value: string) => void;
  addedClasses?: string;
  value?: string;
}

function CustomSelect({
  optionsArray,
  addedClasses,
  onChange,
  value,
}: SelectOptions) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState(
    value ? value : optionsArray[0]
  );

  function handleOpenCloseMenu() {
    setMenuIsOpen((state) => !state);
  }

  function handleChangeStatus(item: string) {
    onChange(item);
    setStatusFilter(item);
    setMenuIsOpen(false);
    buttonRef.current?.focus();
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-(--text-color)">
      <button
        type="button"
        id="application-status"
        aria-haspopup="listbox"
        aria-expanded={menuIsOpen}
        ref={buttonRef}
        className={`bg-(--input-color) rounded-lg px-3 py-2 text-sm focus:outline-none flex justify-between items-center cursor-pointer focus:ring-3 focus:ring-(--text-color-secondary) transition-all ease-in duration-100 ${addedClasses}`}
        onClick={handleOpenCloseMenu}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && menuIsOpen) {
            e.preventDefault();
            optionRefs.current[0]?.focus();
          }
        }}
      >
        <span>{statusFilter}</span>
        <span>
          {menuIsOpen ? (
            <ChevronUp
              size={16}
              aria-hidden
              className="opacity-50 text-(--input-placeholder-2)"
            />
          ) : (
            <ChevronDown
              size={16}
              aria-hidden
              className="opacity-50 text-(--input-placeholder-2)"
            />
          )}
        </span>
      </button>

      {menuIsOpen && (
        <div
          ref={dropdownRef}
          className="border border-[rgba(0,0,0,0.1)] text-sm bg-(--text-color-2) text-(--text-color) rounded-lg absolute w-full px-1.5 py-2 flex flex-col mt-1.5 transition-all ease-in-out duration-300 z-10"
        >
          <ul role="listbox">
            {optionsArray.map((option, i) => (
              <li
                key={option}
                role="option"
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                tabIndex={0}
                className="px-1 py-2 rounded-sm cursor-pointer hover:bg-(--input-color) focus:bg-(--input-color) outline-none"
                onClick={() => handleChangeStatus(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleChangeStatus(option);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const next = optionRefs.current[i + 1];
                    (next || optionRefs.current[0])?.focus(); // loop
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const prev = optionRefs.current[i - 1];
                    (
                      prev || optionRefs.current[optionsArray.length - 1]
                    )?.focus(); // loop
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setMenuIsOpen(false);
                    buttonRef.current?.focus();
                  }
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
