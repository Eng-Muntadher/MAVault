import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import ExploreImagesFilterOption from "./ExploreImagesFilterOption";
import { useSearchParams } from "react-router-dom";

interface buttonsDataShape {
  icon: LucideIcon;
  name: string;
}

interface buttonsDataProp {
  buttonsData: buttonsDataShape[];
  addedClassesForContainer?: string;
  addedClassesForElements?: string;
  ariaLabel?: string;
  setterFunction: (value: string) => void;
}

// This component is used to sort images with Sync to the URL
function ExploreImagesFilterOptionsList({
  buttonsData,
  addedClassesForContainer,
  addedClassesForElements,
  ariaLabel,
  setterFunction,
}: buttonsDataProp) {
  const [searchParams] = useSearchParams();

  // Check if we have navigated to this page via history ⬅
  const SortBy = searchParams.get("sortBy");

  const [selectedBtn, setSelectedBtn] = useState(SortBy || buttonsData[0].name);

  function handleClick(value: string) {
    setSelectedBtn(value);
    setterFunction(value);
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
