import type { LucideIcon } from "lucide-react";

interface UserStatsCardProps {
  icon: LucideIcon;
  statsNumber: number;
  text: string;
}

function UserStatsCard({ icon: Icon, statsNumber, text }: UserStatsCardProps) {
  return (
    <li className="flex flex-col items-center text-(--text-color) rounded-[0.875rem] border border-white/20 bg-white/15 backdrop-blur-sm grow pt-4 pb-6">
      <Icon size={24} />
      <strong className="h-8 mt-2 text-2xl font-normal">{statsNumber}</strong>
      <span className="text-sm text-[#DBEAFE]">{text}</span>
    </li>
  );
}

export default UserStatsCard;
