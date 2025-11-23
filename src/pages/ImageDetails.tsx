import { motion } from "framer-motion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetImage } from "../hooks/useGetImage";
import BackButton from "../components/BackButton";
import ImageDetailsBox from "../components/ImageDetailsBox";
import ImageCommentsBox from "../components/ImageCommentsBox";
import ImageDetailsButtons from "../components/ImageDetailsButtons";
import dayjs from "dayjs";
import SkeletonImageLoading from "../components/SkeletonImageLoading";
import { useIncreaseViews } from "../hooks/useIncreaseViews";

function ImageDetails() {
  const { imageId } = useParams(); // get the image id from the URL

  const { data: image, isPending } = useGetImage(Number(imageId));

  // Update the views in the DB (and cach) for the image when someone clicks it
  useIncreaseViews(Number(imageId));

  // This use effect resets the scroll of the page to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-(--drag-upload-bg) pt-8 border-b border-(--border-color) backdrop-blur-md mb-8 delay">
      <BackButton
        text="Back to previous page"
        addedClasses="px-4 sm:px-6 lg:px-6"
      />

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
                alt={image?.describtion}
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
            isPending || !image
              ? "Loading..."
              : image.created_at
              ? dayjs(image.created_at).format("MMMM D, YYYY")
              : "Loading"
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
