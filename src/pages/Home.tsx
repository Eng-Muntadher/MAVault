import { useNavigate, useSearchParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useGetImages } from "../hooks/useGetImages";
import HeroSection from "../components/HeroSection";
import ImagesFilters from "../components/ImagesFilters";
import type { ImageFilters } from "../services/imagesApi";

// Lazy load the heavy ImagesList component
const ImagesList = lazy(() => import("../components/ImagesList"));

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 12;

  // Get filters from URL
  const [filters, setFilters] = useState<ImageFilters>({
    category:
      (searchParams.get("category") as
        | "nature"
        | "sky"
        | "portrait"
        | "urban"
        | "All Categories") || "All Categories",
    sortBy:
      (searchParams.get("sortBy") as
        | "Most Recent"
        | "Most Popular"
        | "Older First") || "Most Recent",
    search: searchParams.get("search") || undefined,
  });

  // Save current fetched Images
  const {
    data: images,
    isPending,
    isError,
    error,
  } = useGetImages(currentPage, pageSize, filters);

  // Show Different number of pagination buttons based on current screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 350) {
        // Very small screens: show 2 buttons
        setMaxVisiblePages(2);
      } else if (window.innerWidth < 640) {
        // Mobile: show 3 buttons
        setMaxVisiblePages(3);
      } else if (window.innerWidth < 1024) {
        // Tablet: show 5 buttons
        setMaxVisiblePages(5);
      } else {
        // Desktop: show 7 buttons
        setMaxVisiblePages(7);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This use effect resets the scroll of the page to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate visible page numbers (responsive based on screen size)
  const getVisiblePages = () => {
    if (!images) return [];

    const totalPages = images.totalPages;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate the starting page for the current window
    // This creates "chunks" of pages that shift when clicking first or last button
    let start =
      Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    // If we're at the end and don't have enough pages, adjust start
    if (end - start + 1 < maxVisiblePages && end === totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (pageSize !== 12) params.set("pageSize", pageSize.toString());

    // Preserve filters and sort in URL
    if (filters.category && filters.category !== "All Categories")
      params.set("category", filters.category);
    if (filters.sortBy && filters.sortBy !== "Most Recent")
      params.set("sortBy", filters.sortBy);
    if (filters.search) params.set("search", filters.search);

    window.scrollTo(0, 0);

    // Change the URL based on the current page
    navigate(`/home?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: Partial<ImageFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Reset to page 1 when filters change
    const params = new URLSearchParams();
    params.set("page", "1");
    if (pageSize !== 12) params.set("pageSize", pageSize.toString());

    // Add filters to URL
    if (updatedFilters.category && updatedFilters.category !== "All Categories")
      params.set("category", updatedFilters.category);
    if (updatedFilters.sortBy && updatedFilters.sortBy !== "Most Recent")
      params.set("sortBy", updatedFilters.sortBy);
    if (updatedFilters.search) params.set("search", updatedFilters.search);

    navigate(`/home?${params.toString()}`);
  };

  return (
    <>
      <HeroSection handleFilterChange={handleFilterChange} />
      <ImagesFilters
        imagesCount={images?.count || 0}
        isPending={isPending}
        handleFilterChange={handleFilterChange}
      />

      {/* Lazy load ImagesList with Suspense boundary */}
      <Suspense
        fallback={<div className="w-full h-96 bg-(--text-color-2)"></div>}
      >
        <ImagesList
          images={images?.data}
          isPending={isPending}
          isError={isError}
          error={error}
          handlePagiantion={handlePageChange}
          totalPages={images?.totalPages || 0}
          currentPage={currentPage}
          visiblePages={visiblePages}
          addedClasses="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 max-lg:grid-cols-2 max-sm:grid-cols-1"
        />
      </Suspense>
    </>
  );
}

export default Home;
