import SkillsList from "./SkillsList";

function TechStack() {
  return (
    <section
      className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-4px_rgba(0,0,0,0.1)] p-8 pb-6 mb-20"
      aria-labelledby="tech-stack"
    >
      <h3
        className="text-2xl text-(--text-color) text-center mb-6"
        id="tech-stack"
      >
        Tech Stack
      </h3>
      <SkillsList />
    </section>
  );
}

export default TechStack;
