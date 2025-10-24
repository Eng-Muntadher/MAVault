import CustomSelect from "./CustomSelect";

function ImagesFilters() {
  return (
    <section
      aria-label="Filter images by category and date"
      className="relative border-b border-gray-200 shadow-sm py-4"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <div className="flex gap-3 max-[410px]:flex-col">
          <CustomSelect
            optionsArray={["one", "two", "three", "four", "five"]}
            onChange={(x) => console.log(x)}
            addedClasses="w-44"
          />

          <CustomSelect
            optionsArray={["one", "two", "three", "four", "five"]}
            onChange={(x) => console.log(x)}
            addedClasses="w-44"
          />
        </div>

        {/* I used aria-live="polite" so that screen readers announce the number of images automatically*/}
        <p className="text-sm text-(--input-placeholder)" aria-live="polite">
          12 images found
        </p>
      </div>
    </section>
  );
}

export default ImagesFilters;
