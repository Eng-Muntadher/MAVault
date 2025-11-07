import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface AboutArticleProps {
  icon: LucideIcon;
  iconColor: string; // accept CSS variables or normal values like #fff
  iconBgColor: string; // accept CSS variables or normal values like #fff
  headingText: string;
  bodyText: string[]; // each element is a text to be used in a seperate p element with margin to seperate them
  ariaLabelledBy: string; // passing a label to link the section to the h2
}
const animations = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AboutArticle({
  icon: Icon,
  iconColor,
  iconBgColor,
  headingText,
  bodyText,
  ariaLabelledBy,
}: AboutArticleProps) {
  return (
    <motion.article
      variants={animations}
      className="rounded-[0.875rem] border-2 border-gray-200 bg-white shadow-lg p-8 pb-2"
      aria-labelledby={ariaLabelledBy}
    >
      <h2 className="flex gap-3 items-center mb-6" id={ariaLabelledBy}>
        <span
          className={`p-2 rounded-[0.625rem]  text-(${iconColor})`}
          style={{
            backgroundColor: `${iconBgColor}`,
            color: `${iconColor}`,
          }}
        >
          <Icon size={24} aria-hidden="true" />
        </span>

        <span className="text-2xl text-(--text-color)">{headingText}</span>
      </h2>
      {bodyText.map((el, i) => (
        <p key={i} className="mb-4 text-(--nav-links-color) leading-6.5">
          {el}
        </p>
      ))}
    </motion.article>
  );
}

export default AboutArticle;
