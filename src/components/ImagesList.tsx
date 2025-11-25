import type { Image } from "../services/imagesApi";
import ImageItem from "./ImageItem";
import SkeletonImageLoading from "./SkeletonImageLoading";

interface ImagesListProps {
  addedClasses?: string;
  images: Image[] | undefined | null;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  handlePagiantion: (newPage: number) => void;
  totalPages: number;
  currentPage: number;
  visiblePages: number[];
}

const skeletonArray = Array.from({ length: 12 }, (_, i) => i + 1);

// This is the images list with pagination that is used in the Home Page
function ImagesList({
  addedClasses,
  images,
  isPending,
  isError,
  error,
  handlePagiantion,
  totalPages,
  currentPage,
  visiblePages,
}: ImagesListProps) {
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load images"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--landing-page-bg) pt-12 delay">
      <section className={addedClasses}>
        {/* Show skeletons while fetching */}
        {isPending &&
          skeletonArray.map((el) => <SkeletonImageLoading key={el} />)}

        {/* Show final images */}
        {!isPending && (
          <>
            {images?.length === 0 ? (
              <p className="text-xl text-(--text-color) mb-5 col-span-3 text-center">
                No Images Found!
              </p>
            ) : (
              images?.map((image, index) => (
                <ImageItem
                  key={image.id}
                  image={image.url}
                  index={index}
                  imageId={image.id}
                  title={image.title}
                  category={image.category}
                  describtion={image.describtion}
                  publisherId={image.publisher_id}
                  likes={image.likes}
                />
              ))
            )}
          </>
        )}
      </section>

      {/* Pagination */}
      {visiblePages.length > 1 && (
        <div
          className="flex gap-2 justify-center items-center mt-12 pb-12 px-4 sm:px-6 lg:px-8"
          aria-label="Images pagination"
        >
          <button
            aria-label={`Go back one page. Current page is ${currentPage}`}
            onClick={() => handlePagiantion(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-(--text-color) bg-(--pagination-btn-bg) hover:bg-(--command-pallete-hover) text-sm font-semibold rounded-lg disabled:opacity-50 py-2 px-4 border border-(--border-color) cursor-pointer transition-and-focus-ring"
          >
            Previous
          </button>

          {visiblePages.map((pageNum) => (
            <button
              key={pageNum}
              aria-label={`Go to page ${pageNum}`}
              disabled={pageNum === currentPage}
              className="text-sm text-(--text-color) bg-(--pagination-btn-bg) font-semibold px-4 py-2 rounded-lg cursor-pointer border border-(--border-color) hover:bg-(--command-pallete-hover) transition-and-focus-ring disabled:text-(--text-color-2) disabled:bg-(--selected-btn-pagination)"
              onClick={() => handlePagiantion(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            aria-label={`Go forward one page. Current page is ${currentPage}`}
            onClick={() => handlePagiantion(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-(--text-color) bg-(--pagination-btn-bg) text-sm font-semibold rounded-lg py-2 px-4 disabled:opacity-50 border border-(--border-color) cursor-pointer hover:bg-(--command-pallete-hover) transition-and-focus-ring"
          >
            Next
          </button>
        </div>
      )}

      <hr className="flex px-20 pt-[0.05rem] border-t border-(--border-color) mb-8" />
    </div>
  );
}

export default ImagesList;
