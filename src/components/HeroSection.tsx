import { Search } from "lucide-react";

function HeroSection() {
  return (
    <section className="py-20 landing-bg">
      <div className="flex flex-col items-center mx-auto w-fit px-4">
        <h1 className="text-6xl mb-4 text-(--text-color-2) text-center max-md:text-4xl">
          Discover Amazing Images
        </h1>

        <p className="text-(--text-color-secondary) text-xl mb-8 text-center max-md:text-lg">
          Explore, share, and connect with creative minds from around the world
        </p>

        <div className="w-full relative text-(--input-placeholder-2)">
          {/* Sr only label */}
          <label htmlFor="search-images" className="sr-only">
            Search images, tags, or artists
          </label>

          <input
            type="text"
            name="search-images"
            id="search-images"
            className="text-sm py-3.5 pr-4 pl-12 bg-(--text-color-2) rounded-lg w-full"
            placeholder="Search images, tags, or artists..."
          />
          <Search
            aria-hidden="true"
            size={20}
            // this does not allow the icon to block focus click or typing
            pointerEvents="none"
            className="absolute text-[#99A1AF] left-4 -translate-y-1/2 top-1/2"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
