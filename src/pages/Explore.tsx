import { Clock, Flame, Star } from "lucide-react";
import ExploreCategoryOptionsList from "../components/ExploreCategoryOptionsList";
import ExploreImagesFilterOptionsList from "../components/ExploreImagesFilterOptionsList";
import ExplorePageHeader from "../components/ExplorePageHeader";
import ImagesList from "../components/ImagesList";
import UploadImageFromExplore from "../components/UploadImageFromExplore";
import { useGetImages } from "../hooks/useGetImages";
import { useState } from "react";

function Explore() {
  const [filter, setFilter] = useState("trending");

  const { data: images, isPending } = useGetImages();

  const filterButtonsData = [
    { icon: Flame, name: "Trending" },
    { icon: Star, name: "Featured" },
    { icon: Clock, name: "Recent" },
  ];

  return (
    <div className="bg-(--landing-page-bg) pt-8 border-t border-b border-gray-200 backdrop-blur-md mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExplorePageHeader />
        <ExploreCategoryOptionsList />
        <ExploreImagesFilterOptionsList
          buttonsData={filterButtonsData}
          addedClassesForContainer="w-md"
          ariaLabel="Filter images by date, most rated or featured"
          setterFunction={(filter) => setFilter(filter)}
        />
        <ImagesList
          images={images}
          isPending={isPending}
          usedOutsideHomePage={true}
          addedClasses="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"
        />
        <UploadImageFromExplore />
      </div>
    </div>
  );
}

export default Explore;
