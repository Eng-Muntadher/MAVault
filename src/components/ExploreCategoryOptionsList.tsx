import { useState } from "react";
import { motion } from "framer-motion";
import ExploreCategoryOption from "./ExploreCategoryOption";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ButtonsDataShape {
  icon: LucideIcon;
  name: string;
  count: number;
}

interface OptionsListProps {
  buttonsData: ButtonsDataShape[];
}
function ExploreCategoryOptionsList({ buttonsData }: OptionsListProps) {
  const [selectedBtn, setSelectedBtn] = useState("All");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCategoryChange = (category: string) => {
    // Set the URL with new category parameter
    // This will trigger a refetch because the queryKey includes the filters
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    navigate(`?${params.toString()}`, { replace: true });
  };

  function handleClick(name: string) {
    setSelectedBtn(name);
    handleCategoryChange(name);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
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
    </motion.section>
  );
}

export default ExploreCategoryOptionsList;
