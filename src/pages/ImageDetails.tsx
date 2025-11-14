import { motion } from "framer-motion";
import { useEffect } from "react";
import BackButton from "../components/BackButton";
import ImageDetailsBox from "../components/ImageDetailsBox";
import ImageCommentsBox from "../components/ImageCommentsBox";
import ImageDetailsButtons from "../components/ImageDetailsButtons";
import { useParams } from "react-router-dom";
import { useGetImages } from "../hooks/useGetImages";
import dayjs from "dayjs";
import { increaseViews } from "../services/imagesApi";
import SkeletonImageLoading from "../components/SkeletonImageLoading";

function ImageDetails() {
  /* This use effect resets the scroll of the page so that when
    the user clicks on an image located in the bottom of Home page, the user will be directed to the start of this page not end of it */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { imageId } = useParams(); // get the image id from the URL

  const { data: images, isPending } = useGetImages();

  const image = images?.find((img) => img?.id === Number(imageId));

  // Update the views in the DB for the image when someone clicks it
  useEffect(() => {
    if (!image) return; // exit if image not ready
    increaseViews(image.id);
  }, [image]);
  console.log(image);

  return (
    <div className="bg-(--drag-upload-bg) pt-8 border-t border-b border-(--border-color) backdrop-blur-md mb-8">
      <BackButton text="Back to Gallery" addedClasses="px-4 sm:px-6 lg:px-6" />

      <div className="flex gap-8 mt-8 justify-center px-4 sm:px-6 lg:px-6 max-[1140px]:flex-col">
        <div>
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isPending ? (
              <SkeletonImageLoading
                heightClass="h-[555px]"
                addedClasses="grow"
              />
            ) : (
              <img
                className="rounded-[0.875rem] h-[555px] w-3xl max-[1140px]:w-full mx-auto object-cover"
                src={image?.url}
                alt="image..."
              />
            )}

            {/* Image description for accessibility */}
            <figcaption className="sr-only">...</figcaption>
          </motion.figure>

          <ImageDetailsButtons
            likes={image?.likes}
            url={image?.url}
            title={image?.title}
            imageId={Number(imageId)}
          />

          <ImageCommentsBox imageId={Number(imageId)} />
        </div>

        <ImageDetailsBox
          title={image?.title}
          describtion={image?.describtion}
          date={
            image?.created_at
              ? dayjs(image?.created_at).format("MMMM D, YYYY")
              : "Unknown"
          }
          views={image?.views}
          tags={image?.tags}
          publisherId={image?.publisher_id}
          dimensions={image?.dimensions}
        />
      </div>
    </div>
  );
}

export default ImageDetails;
