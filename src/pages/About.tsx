import AboutPageKeyHighlights from "../components/AboutPageKeyHighlights";
import TechStack from "../components/TechStack";
import AboutPageConnectInfo from "../components/AboutPageConnectInfo";
import AboutPageHeading from "../components/AboutPageHeading";
import AboutArticleList from "../components/AboutArticleList";

function About() {
  return (
    <div className="bg-(--landing-page-bg) border-t border-b border-gray-200 backdrop-blur-md mb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <AboutPageHeading />
        <AboutArticleList />

        <AboutPageKeyHighlights />
        <TechStack />
        <hr className="border-0 h-px bg-black/10 mb-8" />

        <AboutPageConnectInfo />
      </div>
    </div>
  );
}

export default About;
