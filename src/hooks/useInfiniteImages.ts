import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getInfiniteImages } from "../services/imagesApi";

// Custom hook for infinite scroll
export const useInfiniteImages = () => {
  const [searchParams] = useSearchParams();

  // Extract filters and sort from URL
  const filters = {
    category: searchParams.get("category") || "",
  };

  const sortBy = (searchParams.get("sortBy") || "created_at") as
    | "Trending"
    | "Featured"
    | "Recent";

  return useInfiniteQuery({
    queryKey: ["images", filters, sortBy],
    queryFn: ({ pageParam = 0 }) =>
      getInfiniteImages({ pageParam, filters, sortBy }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
