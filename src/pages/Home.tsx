import HeroSection from "../components/HeroSection";
import ImagesFilters from "../components/ImagesFilters";
import ImagesList from "../components/ImagesList";
import { useGetImages } from "../hooks/useGetImages";

function Home() {
  const { data: images, isPending } = useGetImages();
  return (
    <>
      <HeroSection />
      <ImagesFilters />
      <ImagesList
        images={images}
        isPending={isPending}
        addedClasses="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 max-lg:grid-cols-2 max-sm:grid-cols-1"
      />
    </>
  );
}

export default Home;
