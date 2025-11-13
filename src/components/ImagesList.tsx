import ImageItem from "./ImageItem";
import SkeletonImageLoading from "./SkeletonImageLoading";

interface Image {
  id: number;
  created_at: string;
  title: string;
  describtion: string;
  category: string;
  tags: string;
  url: string;
  likes: number;
  views: number;
  publisher_id: string;
}

interface ImagesListProps {
  usedOutsideHomePage?: boolean;
  addedClasses?: string;
  images: Image[] | undefined | null;
  isPending: boolean;
}
const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function ImagesList({
  usedOutsideHomePage = false,
  addedClasses,
  images,
  isPending,
}: ImagesListProps) {
  return (
    <div className={`${usedOutsideHomePage || "bg-(--landing-page-bg) pt-12"}`}>
      <section className={addedClasses}>
        {/* Return skeleton placholder if isPending is true */}
        {isPending && skeleton.map((el) => <SkeletonImageLoading key={el} />)}

        {/* Return The images grid if isPending is false and data arrives */}
        {isPending ||
          images?.map((image) => (
            <ImageItem
              key={image?.id}
              image={image?.url}
              imageId={image?.id}
              title={image?.title}
              category={image?.category}
              describtion={image?.describtion}
              publisherId={image?.publisher_id}
              likes={image?.likes}
            />
          ))}
      </section>

      {/* Images pagination */}
      {usedOutsideHomePage || (
        <>
          <div
            className="flex gap-2 justify-center items-center mt-12 pb-12"
            aria-label="Images pagination"
          >
            <button
              className="text-(--text-color) bg-(--pagination-btn-bg) hover:bg-(--command-pallete-hover) text-sm font-semibold rounded-lg opacity-50 py-2 px-4 border border-(--border-color) cursor-pointer transition-and-focus-ring"
              aria-label="Go back one page. Current page is 1"
            >
              Previous
            </button>

            <button
              className="text-sm text-(--text-color-2) font-semibold px-4 py-2 rounded-lg bg-(--selected-btn-pagination) cursor-pointer hover:bg-blue-700 transition-and-focus-ring"
              aria-label="Go to page 1"
            >
              1
            </button>

            <button
              className="text-sm text-(--text-color) bg-(--pagination-btn-bg) font-semibold px-4 py-2 rounded-lg border border-(--border-color) cursor-pointer hover:bg-(--command-pallete-hover) transition-and-focus-ring"
              aria-label="Go to page 2"
            >
              2
            </button>

            <button
              className="text-(--text-color) bg-(--pagination-btn-bg) text-sm font-semibold rounded-lg py-2 px-4 border border-(--border-color) cursor-pointer hover:bg-(--command-pallete-hover) transition-and-focus-ring"
              aria-label="Go forward one page. Current page is 1"
            >
              Next
            </button>
          </div>

          <hr className="flex px-20 pt-[0.05rem] border-t border-(--border-color) mb-8" />
        </>
      )}
    </div>
  );
}

export default ImagesList;
