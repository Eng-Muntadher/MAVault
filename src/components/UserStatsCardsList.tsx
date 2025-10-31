import { Bookmark, Heart, MessageSquare, Upload } from "lucide-react";
import UserStatsCard from "./UserStatsCard";

const cardsData = [
  { icon: Upload, statsNumber: 4, text: "Uploads" },
  { icon: Heart, statsNumber: 9, text: "Likes" },
  { icon: Bookmark, statsNumber: 0, text: "Saved" },
  { icon: MessageSquare, statsNumber: 0, text: "Comments" },
];

function UserStatsCardsList() {
  return (
    <ul className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
      {cardsData.map((card) => (
        <UserStatsCard
          key={card.text}
          icon={card.icon}
          statsNumber={card.statsNumber}
          text={card.text}
        />
      ))}
    </ul>
  );
}

export default UserStatsCardsList;
