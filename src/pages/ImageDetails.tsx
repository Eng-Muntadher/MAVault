import image from "../assets/photo-1561896196-2fdcc3691049.jfif";
import BackButton from "../components/BackButton";
import ImageDetailsBox from "../components/ImageDetailsBox";
import ImageCommentsBox from "../components/ImageCommentsBox";
import ImageDetailsButtons from "../components/ImageDetailsButtons";
import { useEffect } from "react";

function ImageDetails() {
  /* This use effect resets the scroll of the page so that when
    the user clicks on an image located in the bottom of Home page, the user will be directed to the start of this page not end of it */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F9FAFB] pt-8 border-t border-b border-gray-200 backdrop-blur-md mb-8">
      <BackButton text="Back to Gallery" addedClasses="px-4 sm:px-6 lg:px-6" />

      <div className="flex gap-8 mt-8 justify-center px-4 sm:px-6 lg:px-6 max-[1140px]:flex-col">
        <div>
          <figure>
            <img
              className="rounded-[0.875rem] h-[555px] max-[1140px]:w-full max-[1140px]:h-fit mx-auto"
              src={image}
              alt="image..."
            />

            {/* Image description for accessibility */}
            <figcaption className="sr-only">...</figcaption>
          </figure>

          <ImageDetailsButtons />

          <ImageCommentsBox />
        </div>

        <ImageDetailsBox />
      </div>
    </div>
  );
}

export default ImageDetails;
