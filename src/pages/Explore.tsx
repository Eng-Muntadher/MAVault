import { Clock, Flame, Star, Stars, TrendingUp } from "lucide-react";
import ExploreCategoryOptionsList from "../components/ExploreCategoryOptionsList";
import ExploreImagesFilterOptionsList from "../components/ExploreImagesFilterOptionsList";
import ExplorePageHeader from "../components/ExplorePageHeader";
import UploadImageFromExplore from "../components/UploadImageFromExplore";
import InfiniteImagesList from "../components/InfiniteImagesList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCategoriesCount } from "../hooks/useGetCategoriesCount";
import { useEffect } from "react";

function Explore() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: categories } = useGetCategoriesCount();

  // This use effect resets the scroll of the page to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSortByChange = (sortBy: string) => {
    // Set the URL with new sortBy parameter
    // This will trigger a refetch because the queryKey includes the sortBy
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortBy);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const filterButtonsData = [
    { icon: Flame, name: "Trending" },
    { icon: Star, name: "Featured" },
    { icon: Clock, name: "Recent" },
  ];

  const buttonsData = [
    { icon: Stars, name: "All", count: categories?.totalItems || 0 },
    { icon: TrendingUp, name: "Nature", count: categories?.counts.Nature || 0 },
    { icon: Star, name: "Sky", count: categories?.counts.Sky || 0 },
    { icon: Flame, name: "Portrait", count: categories?.counts.Portrait || 0 },
    { icon: Clock, name: "Urban", count: categories?.counts.Urban || 0 },
  ];

  return (
    <div className="bg-(--landing-page-bg) pt-8 border-b border-(--border-color) backdrop-blur-md mb-8 delay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExplorePageHeader />

        <ExploreCategoryOptionsList buttonsData={buttonsData} />

        <ExploreImagesFilterOptionsList
          buttonsData={filterButtonsData}
          addedClassesForContainer="w-md"
          ariaLabel="Filter images by date, most rated or featured"
          setterFunction={handleSortByChange}
        />

        <InfiniteImagesList addedClasses="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1" />

        <UploadImageFromExplore />
      </div>
    </div>
  );
}

export default Explore;
