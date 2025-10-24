import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ImagesFilters from "../components/ImagesFilters";
import ImagesList from "../components/ImagesList";

function Home() {
  return (
    <>
      <HeroSection />
      <ImagesFilters />
      <ImagesList />
      <Footer />
    </>
  );
}

export default Home;
