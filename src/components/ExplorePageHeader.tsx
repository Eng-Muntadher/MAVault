import { TrendingUp } from "lucide-react";

function ExplorePageHeader() {
  return (
    <section aria-labelledby="explore-heading">
      <h1 className="flex gap-3 items-center mb-4" id="explore-heading">
        <span
          className="p-2 text-(--text-color-2) purple-bg rounded-[0.625rem]"
          aria-hidden={true}
        >
          <TrendingUp size={24} />
        </span>
        <span className="text-(--text-color) text-4xl">Explore</span>
      </h1>

      <p className="text-(--input-placeholder) text-lg mb-8">
        Discover trending images, featured collections, and fresh content from
        our community
      </p>
    </section>
  );
}

export default ExplorePageHeader;
