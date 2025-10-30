import Skill from "./Skill";

const skills = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion/React",
  "React Router",
  "React Query",
  "React Hot Toast",
  "Lucide Icons",
  "Supabase",
  "React Dropzone",
  "Day.js",
  "React Error Boundary",
];

function SkillsList() {
  return (
    <ul className="flex gap-3 flex-wrap justify-center">
      {skills.map((skill) => (
        <Skill key={skill} skillName={skill} />
      ))}
    </ul>
  );
}

export default SkillsList;
