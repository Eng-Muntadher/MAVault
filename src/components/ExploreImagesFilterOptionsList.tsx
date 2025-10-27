import { Clock, Flame, Star } from "lucide-react";
import ExploreImagesFilterOption from "./ExploreImagesFilterOption";
import { useState } from "react";

const buttonsData = [
  { icon: Flame, name: "Trending" },
  { icon: Star, name: "Featured" },
  { icon: Clock, name: "Recent" },
];

function ExploreImagesFilterOptionsList() {
  const [selectedBtn, setSelectedBtn] = useState("Trending");

  function handleClick(name: string) {
    setSelectedBtn(name);
  }

  return (
    <section
      className="flex justify-between w-md bg-[#ECECF0] px-0.5 py-[0.185rem] rounded-[0.875rem] max-w-full text-sm font-semibold mb-10"
      role="radiogroup"
      aria-label="Filter images by date, most rated or featured"
    >
      {buttonsData.map((btn) => (
        <ExploreImagesFilterOption
          key={btn.name}
          icon={btn.icon}
          name={btn.name}
          isSelected={btn.name === selectedBtn}
          onClick={() => handleClick(btn.name)}
        />
      ))}
    </section>
  );
}

export default ExploreImagesFilterOptionsList;
