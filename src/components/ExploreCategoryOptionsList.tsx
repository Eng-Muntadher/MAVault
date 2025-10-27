import { Clock, Flame, Star, Stars, TrendingUp } from "lucide-react";
import ExploreCategoryOption from "./ExploreCategoryOption";
import { useState } from "react";

const buttonsData = [
  { icon: Stars, name: "All", count: 1247 },
  { icon: TrendingUp, name: "Nature", count: 456 },
  { icon: Star, name: "Architecture", count: 234 },
  { icon: Flame, name: "Art", count: 189 },
  { icon: Clock, name: "Urban", count: 368 },
];

function ExploreCategoryOptionsList() {
  const [selectedBtn, setSelectedBtn] = useState("All");

  function handleClick(name: string) {
    setSelectedBtn(name);
  }

  return (
    <section
      className="flex gap-3 flex-wrap mb-8"
      aria-label="Explore categories"
    >
      {buttonsData.map((btn) => (
        <ExploreCategoryOption
          key={btn.name}
          icon={btn.icon}
          name={btn.name}
          count={btn.count}
          isSelected={btn.name === selectedBtn}
          onClick={() => handleClick(btn.name)}
        />
      ))}
    </section>
  );
}

export default ExploreCategoryOptionsList;
