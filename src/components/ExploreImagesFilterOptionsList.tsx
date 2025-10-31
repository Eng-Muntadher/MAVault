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
}

function ExploreImagesFilterOptionsList({
  buttonsData,
  addedClassesForContainer,
  addedClassesForElements,
  ariaLabel,
}: buttonsDataProp) {
  const [selectedBtn, setSelectedBtn] = useState(buttonsData[0].name);

  function handleClick(name: string) {
    setSelectedBtn(name);
  }

  return (
    <section
      className={`flex justify-between bg-[#ECECF0] px-0.5 py-[0.185rem] rounded-[0.875rem] max-w-full text-sm font-semibold mb-10 ${addedClassesForContainer}`}
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
