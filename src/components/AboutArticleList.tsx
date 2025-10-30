import { Code, Rocket, Target } from "lucide-react";
import AboutArticle from "./AboutArticle";

function AboutArticleList() {
  return (
    <div className="flex flex-col gap-12 mb-12">
      <AboutArticle
        ariaLabelledBy="about-the-developer"
        icon={Code}
        iconColor="var(--selected-btn-pagination)"
        iconBgColor="var(--about-page-icons-bg-blue)"
        headingText="About the Developer"
        bodyText={[
          `Hello, I'm Muntadher Ahmed! A passionate web developer and a computer engineer. I enjoy creating beautiful, functional, and user-friendly applications. I believe that
          great software combines clean code with exceptional user experience, and I strive to achieve this balance in every project I
          build. I always try to express my self with my own projects (like this images vault named after me), I try to let people know me through my code.`,
          `With a keen eye for design and a commitment to writing clean, maintainable code, I focus on building applications
          that not only look great but also perform flawlessly across all devices and browsers while always trying to learn new things along the way.`,
        ]}
      />

      <AboutArticle
        ariaLabelledBy="my-coding-Journey"
        icon={Rocket}
        iconColor="#9810FA"
        iconBgColor="var(--about-page-icons-bg-purple)"
        headingText="My Coding Journey"
        bodyText={[
          `My first lines of code were written in college about 4 years ago. My journey into web development began nearly 2 years ago with curiosity about how websites work, and quickly grew into a deep passion for creating digital experiences for others.`,

          `I’ve spent countless hours exploring new technologies, building projects, and learning from the developer community. Each challenge taught me valuable lessons about problem-solving, persistence, and the importance of continuous learning in the ever-evolving tech industry.`,

          `Today, I focus on building production-ready applications that demonstrate technical skill, attention to detail, user empathy, and professional-grade code quality.`,
        ]}
      />

      <AboutArticle
        ariaLabelledBy="why-i-Built-mavault"
        icon={Target}
        iconColor="#00A63E"
        iconBgColor="var(--about-page-icons-bg-green)"
        headingText="Why I Built MAVault"
        bodyText={[
          `MAVault was created as a comprehensive portfolio project to demonstrate my ability to
          build complex, feature-rich web applications. I wanted this project to be personal, that's why all the images here are taken and uploaded by me. I also wanted to create something that goes beyond
          basic CRUD operations and showcases real-world functionality that users would find in production applications.`,
          `This project challenged me to implement advanced features like authentication flows, state management, responsive design,
          dark mode, animations, and complex user interactions. Each feature was an opportunity to learn something new and push my skills further.`,
          `My goal was to create an application that not only looks professional but also demonstrates best practices in code organization, component architecture,
          and user experience design. MAVault is meant to reflect (and blend) my passion for photography and web development.`,
        ]}
      />
    </div>
  );
}

export default AboutArticleList;
