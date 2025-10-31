import { Bookmark, Heart, MessageSquare, Upload } from "lucide-react";
import ExploreImagesFilterOptionsList from "../components/ExploreImagesFilterOptionsList";
import ImagesList from "../components/ImagesList";
import UserProfileMainSection from "../components/UserProfileMainSection";

function UserProfile() {
  const filterButtonsData = [
    { icon: Upload, name: "Uploads" },
    { icon: Heart, name: "Liked" },
    { icon: Bookmark, name: "Saved" },
    { icon: MessageSquare, name: "Comments" },
  ];

  return (
    <>
      <UserProfileMainSection />

      <div className="bg-(--landing-page-bg) px-40 max-sm:px-6 max-xl:px-6 pt-8 pb-10">
        <ExploreImagesFilterOptionsList
          buttonsData={filterButtonsData}
          addedClassesForContainer="w-[672px]"
          addedClassesForElements="max-sm:hidden"
          ariaLabel="Filter the images by the ones you uploaded, liked, bookmarked or commented on"
        />
        <ImagesList
          tempData={[1, 2, 3, 4]}
          usedOutsideHomePage={true}
          addedClasses="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
        />
      </div>

      <hr className="border-0 h-px bg-black/10 mb-8" />
    </>
  );
}

export default UserProfile;
