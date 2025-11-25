import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCategoriesCount } from "../hooks/useGetCategoriesCount";
import { Clock, Flame, Star, Stars, TrendingUp } from "lucide-react";
import ExploreCategoryOptionsList from "../components/ExploreCategoryOptionsList";
import ExploreImagesFilterOptionsList from "../components/ExploreImagesFilterOptionsList";
import ExplorePageHeader from "../components/ExplorePageHeader";
import UploadImageFromExplore from "../components/UploadImageFromExplore";
import SkeletonImageLoading from "../components/SkeletonImageLoading";

// This is a relativally large component (and not needed up front) so we lazy load it
const InfiniteImagesList = lazy(
  () => import("../components/InfiniteImagesList")
);

// Placeholders until the images list arrives from the server
function InfiniteImagesListSkeleton() {
  const skeleton = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="grid grid-cols-4 gap-4">
      {skeleton.map((el) => (
        <SkeletonImageLoading key={el} />
      ))}
    </div>
  );
}

function Explore() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // We use this custom hook to calculate how many images in each category in the database
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

        <Suspense fallback={<InfiniteImagesListSkeleton />}>
          <InfiniteImagesList addedClasses="grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1" />
        </Suspense>

        <UploadImageFromExplore />
      </div>
    </div>
  );
}

export default Explore;
