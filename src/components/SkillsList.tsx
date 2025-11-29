import Skill from "./Skill";

// These are the skills/technologies I used to build this app 💯
const skills = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "React Router",
  "React Query",
  "React Hot Toast",
  "Lucide Icons",
  "Supabase",
  "React Dropzone",
  "Day.js",
  "React Error Boundary",
  "heic2any",
  "React Virtual",
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
