import { useEffect, useState } from "react";
import { useGetUserImages } from "../hooks/useGetUserImages";
import { Bookmark, Heart, MessageSquare, Upload } from "lucide-react";
import ExploreImagesFilterOptionsList from "../components/ExploreImagesFilterOptionsList";
import UserProfileMainSection from "../components/UserProfileMainSection";
import UserImagesList from "../components/UserImagesList";

function UserProfile() {
  const [imageFilter, setImageFilter] = useState("uploads");

  // This use effect resets the scroll of the page to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: images,
    isPending,
    error,
    isError,
  } = useGetUserImages(imageFilter.toLowerCase());

  const filterButtonsData = [
    { icon: Upload, name: "Uploads" },
    { icon: Heart, name: "Liked" },
    { icon: Bookmark, name: "Saved" },
    { icon: MessageSquare, name: "Comments" },
  ];

  return (
    <>
      <UserProfileMainSection />

      <div className="bg-(--landing-page-bg) px-40 max-sm:px-6 max-xl:px-6 pt-8 pb-10 delay">
        <ExploreImagesFilterOptionsList
          buttonsData={filterButtonsData}
          addedClassesForContainer="w-[672px]"
          addedClassesForElements="max-sm:hidden"
          ariaLabel="Filter the images by the ones you uploaded, liked, bookmarked or commented on"
          setterFunction={(filter) => setImageFilter(filter)}
        />

        <UserImagesList
          images={images || []}
          isPending={isPending}
          error={error}
          isError={isError}
          addedClasses="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
        />
      </div>

      <hr className="flex px-20 pt-[0.05rem] border-t border-(--border-color) mb-8" />
    </>
  );
}

export default UserProfile;
