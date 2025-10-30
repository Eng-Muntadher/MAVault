import { Lightbulb } from "lucide-react";

function AboutPageHeading() {
  return (
    <section
      className="flex flex-col items-center text-center mb-16"
      aria-labelledby="about-heading"
    >
      <div className="purple-bg text-white flex items-center justify-center rounded-full h-20 w-20 mb-6">
        <Lightbulb size={40} aria-hidden="true" />
      </div>
      <h1
        className="text-5xl bg-linear-to-r from-[#155DFC] to-[#9810FA] bg-clip-text text-transparent mb-4"
        id="about-heading"
      >
        About MAVault
      </h1>
      <p className="text-xl text-(--input-placeholder) max-w-2xl">
        A modern, feature-rich image gallery application built to showcase
        professional web development skills
      </p>
    </section>
  );
}

export default AboutPageHeading;
