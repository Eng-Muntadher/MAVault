import { useSearchParams } from "react-router-dom";
import type { ImageFilters } from "../services/imagesApi";
import CustomSelect from "./CustomSelect";

interface ImagesFiltersProps {
  imagesCount: number;
  isPending: boolean;
  handleFilterChange: (newFilters: Partial<ImageFilters>) => void;
}

function ImagesFilters({
  imagesCount,
  isPending,
  handleFilterChange,
}: ImagesFiltersProps) {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");

  return (
    <div className="sticky top-16 z-200 bg-(--filters-bg)">
      <section
        aria-label="Filter images by category and date"
        className="relative border-b border-(--border-color) shadow-sm py-4"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <div className="flex gap-3 max-[410px]:flex-col">
            <CustomSelect
              optionsArray={[
                "All Categories",
                "Sky",
                "Nature",
                "Portrait",
                "Urban",
              ]}
              value={category}
              onChange={(value) =>
                handleFilterChange({ category: value || undefined })
              }
              addedClasses="w-44"
            />

            <CustomSelect
              optionsArray={["Most Recent", "Most Popular", "Older First"]}
              value={sortBy}
              onChange={(value) => handleFilterChange({ sortBy: value })}
              addedClasses="w-44"
            />
          </div>

          {/* I used aria-live="polite" so that screen readers announce the number of images automatically*/}
          <p className="text-sm text-(--input-placeholder)" aria-live="polite">
            {isPending ? "Loading..." : imagesCount + " images found"}
          </p>
        </div>
      </section>
    </div>
  );
}

export default ImagesFilters;
