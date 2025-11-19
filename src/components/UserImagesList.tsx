import type { Image } from "../services/imagesApi";
import ImageItem from "./ImageItem";
import SkeletonImageLoading from "./SkeletonImageLoading";

interface UserImagesListProps {
  addedClasses?: string;
  images: Image[];
  isError: boolean;
  error: Error | null;
  isPending: boolean;
}

const skeleton = Array.from({ length: 12 }, (_, i) => i + 1);

function UserImagesList({
  addedClasses,
  images,
  isError,
  error,
  isPending,
}: UserImagesListProps) {
  if (isError) {
    return (
      <div className="flex text-2xl items-center justify-center min-h-screen">
        <div className="text-red-600">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load images"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--landing-page-bg) pt-12">
      <section className={addedClasses}>
        {/* Skeleton loaders during initial load */}
        {isPending && skeleton.map((el) => <SkeletonImageLoading key={el} />)}

        {/* Display images */}
        {!isPending && images.length === 0 ? (
          <p className="text-xl text-(--text-color) mb-5 col-span-3 text-center">
            No Images Found!
          </p>
        ) : (
          images.map((image) => (
            <ImageItem
              key={image.id}
              image={image.url}
              imageId={image.id}
              title={image.title}
              category={image.category}
              describtion={image.describtion}
              publisherId={image.publisher_id}
              likes={image.likes}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default UserImagesList;
