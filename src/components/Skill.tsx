function Skill({ skillName }: { skillName: string }) {
  return (
    <li className="text-(--text-color) text-sm px-4 py-2.5 font-semibold rounded-lg border-2 skill-class">
      {skillName}
    </li>
  );
}

export default Skill;
