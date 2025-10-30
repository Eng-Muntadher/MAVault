import { Code, Heart, Target, Zap } from "lucide-react";
import KeyHighlightsCard from "./KeyHighlightsCard";

const cardsData = [
  {
    icon: Code,
    title: "Modern Tech Stack",
    text: "Built with cutting-edge technologies and best practices in mind.",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    text: "Fast loading times and smooth animations for the best user experience.",
  },
  {
    icon: Heart,
    title: "User-Centric Design",
    text: "Intuitive interface designed with users in mind, accessible to everyone.",
  },
  {
    icon: Target,
    title: "Portfolio Quality",
    text: "Production-ready code that showcases professional development skills.",
  },
];

function KeyHighlightsCardsList() {
  return (
    <ul className="grid grid-cols-2 gap-6 max-[800px]:grid-cols-1">
      {cardsData.map((el) => (
        <KeyHighlightsCard
          key={el.title}
          icon={el.icon}
          title={el.title}
          text={el.text}
        />
      ))}
    </ul>
  );
}

export default KeyHighlightsCardsList;
