import type { LucideIcon } from "lucide-react";
import ExploreImagesFilterOption from "./ExploreImagesFilterOption";
import { useState } from "react";

interface buttonsDataShape {
  icon: LucideIcon;
  name: string;
}

interface buttonsDataProp {
  buttonsData: buttonsDataShape[];
  addedClassesForContainer?: string;
  addedClassesForElements?: string;
  ariaLabel?: string;
  setterFunction: (filter: string) => void;
}

function ExploreImagesFilterOptionsList({
  buttonsData,
  addedClassesForContainer,
  addedClassesForElements,
  ariaLabel,
  setterFunction,
}: buttonsDataProp) {
  const [selectedBtn, setSelectedBtn] = useState(buttonsData[0].name);

  function handleClick(name: string) {
    setSelectedBtn(name);
    setterFunction(name?.toLowerCase());
  }

  return (
    <section
      className={`flex justify-between text-(--text-color) bg-(--explore-filter-bg) px-0.5 py-[0.185rem] rounded-[0.875rem] max-w-full text-sm font-semibold mb-10 ${addedClassesForContainer}`}
      role="radiogroup"
      aria-label={ariaLabel ? ariaLabel : ""}
    >
      {buttonsData.map((btn) => (
        <ExploreImagesFilterOption
          key={btn.name}
          icon={btn.icon}
          name={btn.name}
          isSelected={btn.name === selectedBtn}
          onClick={() => handleClick(btn.name)}
          addedClasses={addedClassesForElements}
        />
      ))}
    </section>
  );
}

export default ExploreImagesFilterOptionsList;
