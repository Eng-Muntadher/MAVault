import { Bookmark, Heart, MessageSquare, Upload } from "lucide-react";
import { motion } from "framer-motion";
import UserStatsCard from "./UserStatsCard";

interface UserStatsCardsListProps {
  uploads: number;
  likes: number;
  saved: number;
  comments: number;
}

function UserStatsCardsList({
  uploads,
  likes,
  saved,
  comments,
}: UserStatsCardsListProps) {
  const cardsData = [
    { icon: Upload, statsNumber: uploads || 0, text: "Uploads" },
    { icon: Heart, statsNumber: likes || 0, text: "Likes" },
    { icon: Bookmark, statsNumber: saved || 0, text: "Saved" },
    {
      icon: MessageSquare,
      statsNumber: comments || 0,
      text: "Comments",
    },
  ];
  return (
    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-4 gap-4 max-md:grid-cols-2"
    >
      {cardsData.map((card) => (
        <UserStatsCard
          key={card.text}
          icon={card.icon}
          statsNumber={card.statsNumber}
          text={card.text}
        />
      ))}
    </motion.ul>
  );
}

export default UserStatsCardsList;
