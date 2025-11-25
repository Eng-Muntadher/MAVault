import { useInfiniteImages } from "../hooks/useInfiniteImages";
import { useEffect, useRef } from "react";
import ImageItem from "./ImageItem";
import SkeletonImageLoading from "./SkeletonImageLoading";

interface InfiniteImagesListProps {
  addedClasses?: string;
}

const skeleton = Array.from({ length: 12 }, (_, i) => i + 1);

// This component uses the React query infinite scroll mechanism
function InfiniteImagesList({ addedClasses }: InfiniteImagesListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteImages();

  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !isLoading
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const images = data?.pages.flatMap((page) => page.images) || [];

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
        {isLoading && skeleton.map((el) => <SkeletonImageLoading key={el} />)}

        {/* Display images */}
        {!isLoading && images.length === 0 ? (
          <p className="text-xl text-(--text-color) mb-5 col-span-4 text-center">
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

        {/* Skeleton loaders while fetching next page */}
        {isFetchingNextPage &&
          skeleton.map((el) => <SkeletonImageLoading key={`loading-${el}`} />)}

        {/* Intersection observer target (fetch more images when we reach this scroll space) */}
        <div ref={observerTarget} className="h-10" />
      </section>
    </div>
  );
}

export default InfiniteImagesList;
