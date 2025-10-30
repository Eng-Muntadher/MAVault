function Skill({ skillName }: { skillName: string }) {
  return (
    <li className="text-(--text-color) text-sm px-4 py-2.5 font-semibold rounded-lg border border-[#BEDBFF] bg-linear-to-r from-[#EFF6FF] to-[#FAF5FF]">
      {skillName}
    </li>
  );
}

export default Skill;
