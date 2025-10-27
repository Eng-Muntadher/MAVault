import HeroSection from "../components/HeroSection";
import ImagesFilters from "../components/ImagesFilters";
import ImagesList from "../components/ImagesList";

function Home() {
  return (
    <>
      <HeroSection />
      <ImagesFilters />
      <ImagesList tempData={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
    </>
  );
}

export default Home;
