import ImageItem from "./ImageItem";
import image from "../assets/photo-1561896196-2fdcc3691049.jfif";
import GuestImage from "../assets/guest.jpeg";

const tempData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function ImagesList() {
  return (
    <div className="bg-(--landing-page-bg) pt-12">
      <section className="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {tempData.map((el) => (
          <ImageItem
            key={el}
            image={image}
            artistImage={GuestImage}
            category="Automotive"
            describtion="Classic Vintage Car"
            artist="Photomaster"
            likes={534}
          />
        ))}
      </section>

      {/* Images pagination */}
      <div
        className="flex gap-2 justify-center items-center mt-12 pb-12"
        aria-label="Images pagination"
      >
        <button
          className="text-(--text-color) text-sm font-semibold rounded-lg opacity-50 py-2 px-4 border border-black/10 cursor-pointer"
          aria-label="Go back one page. Current page is 1"
        >
          Previous
        </button>

        <button
          className="text-sm text-(--text-color-2) font-semibold px-4 py-2 rounded-lg bg-(--selected-btn-pagination) cursor-pointer hover:bg-blue-700"
          aria-label="Go to page 1"
        >
          1
        </button>

        <button
          className="text-sm text-(--text-color) font-semibold px-4 py-2 rounded-lg border border-black/10 cursor-pointer hover:bg-[#e9ebef]"
          aria-label="Go to page 2"
        >
          2
        </button>

        <button
          className="text-(--text-color) text-sm font-semibold rounded-lg py-2 px-4 border border-black/10 cursor-pointer hover:bg-[#e9ebef]"
          aria-label="Go forward one page. Current page is 1"
        >
          Next
        </button>
      </div>

      <hr className="flex px-20 pt-[0.05rem] border-t border-gray-200 bg-white mb-8" />
    </div>
  );
}

export default ImagesList;
