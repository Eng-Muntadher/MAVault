import { useInfiniteImages } from "../hooks/useInfiniteImages";
import { useEffect, useRef, useMemo, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import ImageItem from "./ImageItem";
import SkeletonImageLoading from "./SkeletonImageLoading";

interface InfiniteImagesListProps {
  addedClasses?: string;
}

const skeleton = Array.from({ length: 3 }, (_, i) => i + 1);

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

  const parentRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  // Flatten all pages into a single array
  const images = useMemo(
    () => data?.pages.flatMap((page) => page.images) || [],
    [data?.pages]
  );

  // Handle responsive column changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1); // sm
      } else if (width < 1024) {
        setColumns(2); // md
      } else if (width < 1536) {
        setColumns(3); // lg
      } else {
        setColumns(3); // xl
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create rows from images (group by COLUMNS)
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < images.length; i += columns) {
      result.push(images.slice(i, i + columns));
    }
    return result;
  }, [images, columns]);

  // Virtual scrolling hook
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 650, // estimated height of one row
    overscan: 3,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Intersection Observer for fetching next page
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

  if (isLoading) {
    return (
      <div className="bg-(--landing-page-bg) pt-12">
        <section className={addedClasses}>
          {skeleton.map((el) => (
            <SkeletonImageLoading key={el} />
          ))}
        </section>
      </div>
    );
  }

  if (!isLoading && images.length === 0) {
    return (
      <div className="bg-(--landing-page-bg) pt-12">
        <section className={addedClasses}>
          <p className="text-xl text-(--text-color) mb-5 col-span-4 text-center">
            No Images Found!
          </p>
        </section>
      </div>
    );
  }

  return (
    <div
      className="bg-(--landing-page-bg) mt-12 h-screen overflow-y-auto scrollbar-thin delay"
      ref={parentRef}
    >
      <section
        className={addedClasses}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const row = rows[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="flex gap-4 px-4 mb-4"
            >
              {row.map((image, idx) => (
                <div key={image.id} className="flex-1 min-w-0">
                  <ImageItem
                    image={image.url}
                    index={virtualItem.index * columns + idx}
                    imageId={image.id}
                    title={image.title}
                    category={image.category}
                    describtion={image.describtion}
                    publisherId={image.publisher_id}
                    likes={image.likes}
                  />
                </div>
              ))}
            </div>
          );
        })}

        {/* Loading skeletons while fetching */}
        {isFetchingNextPage && (
          <div
            style={{
              position: "absolute",
              top: `${virtualizer.getTotalSize()}px`,
              left: 0,
              width: "100%",
            }}
            className="flex gap-4 px-4"
          >
            {skeleton.map((el) => (
              <div key={`loading-${el}`} className="flex-1 min-w-0">
                <SkeletonImageLoading />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hidden observer target for fetching */}
      <div ref={observerTarget} className="h-10" />
    </div>
  );
}

export default InfiniteImagesList;
