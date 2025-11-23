import AboutPageKeyHighlights from "../components/AboutPageKeyHighlights";
import TechStack from "../components/TechStack";
import AboutPageConnectInfo from "../components/AboutPageConnectInfo";
import AboutPageHeading from "../components/AboutPageHeading";
import AboutArticleList from "../components/AboutArticleList";
import { useEffect } from "react";

function About() {
  // This use effect resets the scroll of the page to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-(--landing-page-bg) border-b border-(--border-color) backdrop-blur-md mb-8 delay">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <AboutPageHeading />
        <AboutArticleList />

        <AboutPageKeyHighlights />
        <TechStack />
        <hr className="border-0 h-px bg-(--border-color) mb-8" />

        <AboutPageConnectInfo />
      </div>
    </div>
  );
}

export default About;
