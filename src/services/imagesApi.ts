import supabase from "./supabase";

// variables

const IMAGES_PER_PAGE = 12;
/////////////////////////////////////////////////////////////////////////

// types

export interface UploadImageArguments {
  file: File;
  title: string;
  describtion: string;
  category: string;
  tags: string;
  dimensions: string;
}

export interface CommentStructure {
  imageId: number;
  comment: string;
}

export interface Image {
  id: number;
  created_at?: string;
  title: string;
  category: string;
  tags?: string;
  url: string;
  likes: number;
  views?: number;
  publisher_id: string;
  describtion: string;
  dimensions?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ImageFilters {
  category?: "nature" | "sky" | "portrait" | "urban" | "All Categories";
  sortBy?: "Most Recent" | "Most Popular" | "Older First";
  search?: string;
}

interface FetchImagesParams {
  pageParam?: number;
  filters?: Record<string, string>;
  sortBy?: "Trending" | "Featured" | "Recent";
}
/////////////////////////////////////////////////////////////////////////

// functions

export async function getImages(
  page: number = 1,
  pageSize: number = 12,
  filters: ImageFilters = {}
): Promise<PaginatedResponse<Image>> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Build the base query
  let query = supabase
    .from("Images")
    .select("id, title, category, url, likes, publisher_id, describtion", {
      count: "exact",
    });

  // 1. FILTER BY CATEGORY
  if (filters.category && filters.category !== "All Categories") {
    query = query.eq("category", filters.category);
  }

  // 3. SEARCH FUNCTION (searches in title, tags, and category)
  if (filters.search && filters.search.trim() !== "") {
    const searchTerm = filters.search.trim();
    query = query.or(
      `title.ilike.%${searchTerm}%,tags.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
    );
  }

  // 2. SORT (ascending, descending, or by likes)
  if (filters.sortBy === "Most Popular") {
    query = query.order("likes", { ascending: false });
  } else if (filters.sortBy === "Older First") {
    query = query.order("created_at", { ascending: true });
  } else {
    // Default to descending by created_at
    query = query.order("created_at", { ascending: false });
  }

  // Get total count with filters applied
  const countQuery = supabase
    .from("Images")
    .select("*", { count: "exact", head: true });

  // Apply same filters to count query
  let finalCountQuery = countQuery;
  if (filters.category && filters.category !== "All Categories") {
    finalCountQuery = finalCountQuery.eq("category", filters.category);
  }
  if (filters.search && filters.search.trim() !== "") {
    const searchTerm = filters.search.trim();
    finalCountQuery = finalCountQuery.or(
      `title.ilike.%${searchTerm}%,tags.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
    );
  }

  const { count, error: countError } = await finalCountQuery;
  if (countError) throw countError;

  // Get paginated data with all filters and sorting applied
  const { data, error } = await query.range(from, to);
  if (error) throw error;

  const totalPages = Math.ceil((count || 0) / pageSize);

  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    totalPages,
  };
}

// Fetch images function with pagination, filtering, and sorting
export async function getInfiniteImages({
  pageParam = 0,
  filters = {},
  sortBy = "Trending",
}: FetchImagesParams): Promise<{
  images: Image[];
  nextPage?: number | null;
}> {
  if (sortBy === "Featured") {
    const ids = [10, 11, 12, 13];
    let query = supabase
      .from("Images")
      .select("id, title, category, url, likes, publisher_id, describtion")
      .in("id", ids);

    if (
      filters.category &&
      filters.category.trim() &&
      filters.category !== "All"
    ) {
      query = query.eq("category", filters.category);
    }

    const { data: images, error } = await query;

    if (error) throw error;

    return { images };
  }

  let query = supabase
    .from("Images")
    .select("id, title, category, url, likes, publisher_id, describtion", {
      count: "exact",
    });

  // Apply category filter
  if (
    filters.category &&
    filters.category.trim() &&
    filters.category !== "All"
  ) {
    query = query.eq("category", filters.category);
  }

  // Apply sorting - likes DESC or created_at DESC
  if (sortBy === "Trending") {
    query = query.order("likes", { ascending: false });
  } else if (sortBy === "Recent") {
    query = query.order("created_at", { ascending: false });
  }

  // Apply pagination
  const from = pageParam * IMAGES_PER_PAGE;
  const to = from + IMAGES_PER_PAGE - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }

  const hasMore = count ? from + IMAGES_PER_PAGE < count : false;
  const nextPage = hasMore ? pageParam + 1 : null;

  return { images: data || [], nextPage };
}

export async function getImage(imageId: number) {
  const { data: images, error } = await supabase
    .from("Images")
    .select("*")
    .eq("id", imageId)
    .single();

  if (error) throw new Error("There was an error fetching image!");

  return images;
}

export async function getUserImages(filter: string) {
  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  const currentImageFilter = user?.user_metadata[filter + "_" + "images"];

  const { data, error } = await supabase
    .from("Images")
    .select("id, title, category, url, likes, publisher_id, describtion")
    .in("id", currentImageFilter); // Fetch all liked, uploaded, or bookmarked images images

  if (error) throw new Error(`could not fetch user ${filter} images`);

  return data;
}

export async function getImageComments(imageId: number) {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("image_id", imageId);

  if (error) throw new Error("Error getting comments!");

  return comments;
}

export async function addComment({ imageId, comment }: CommentStructure) {
  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("No signed in user");

  const { error } = await supabase
    .from("comments")
    .insert([{ comment: comment, user_id: user.id, image_id: imageId }]);

  if (error) throw new Error("Unable to post comment!");

  const commentsOnImages = user?.user_metadata?.comments_images || [];
  commentsOnImages.push(imageId);

  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      ...user?.user_metadata, // keep existing fields
      comments_images: commentsOnImages, // only update this field
    },
  });

  if (metaError) throw new Error("Cannot access current user");
}

export async function uploadImage({
  file,
  title,
  describtion,
  category,
  tags,
  dimensions,
}: UploadImageArguments) {
  // Ensure a file was provided
  if (!file) throw new Error("No file provided");

  // Create a unique filename (avoids overwriting)
  const fileName = `${Date.now()}-${file.name}`;

  // Upload image to the 'images' bucket
  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (uploadError) console.error(`Error uploading ${uploadError.message}`);

  // Get the public URL of the uploaded image
  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  if (!data?.publicUrl) throw new Error(`Failed to get public URL`);

  const url = data.publicUrl;

  // set the image likes and views to zero since it has just been uploaded
  const likes = 0;
  const views = 0;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError)
    throw new Error(
      `User not signed in, could not upload ${userError.message}`
    );

  const publisher_id = user?.id;

  const { data: image, error: imageError } = await supabase
    .from("Images")
    .insert([
      {
        title,
        describtion,
        category,
        tags,
        url,
        likes,
        views,
        publisher_id,
        dimensions,
      },
    ])
    .select()
    .single();

  if (imageError)
    throw new Error(`Could not upload image ${imageError.message}`);

  const uploadedImages = user?.user_metadata?.uploads_images || [];
  uploadedImages.push(image.id);

  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      ...user?.user_metadata, // keep existing fields
      uploads_images: uploadedImages, // only update this field
    },
  });

  if (metaError) throw new Error("Cannot access current user");

  return image;
}

export async function increaseViews(imageId: number) {
  const { data, error } = await supabase
    .from("Images")
    .select("views")
    .eq("id", imageId)
    .single();

  if (error) throw error;

  const newViews = (data.views ?? 0) + 1;

  const { error: updateError } = await supabase
    .from("Images")
    .update({ views: newViews })
    .eq("id", imageId);

  if (updateError) throw updateError;
}

export async function getCategoriesCounts() {
  const { data, error } = await supabase.from("Images").select("category");

  if (error) throw new Error("there was an error getting counts!");

  const counts = data.reduce((acc, item) => {
    const cat = item.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalItems = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0
  );

  return { counts, totalItems };
}

// This function is used to validate the user input for the image tags when uploading an image
export function validateCSV(input: unknown): string | null {
  if (typeof input !== "string") return null;

  const items = input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const seen = new Set<string>();
  for (const item of items) {
    const lower = item.toLowerCase();
    if (seen.has(lower)) {
      return null; // duplicate found → invalid
    }
    seen.add(lower);
  }

  return items.length > 0 ? input : null; // return original string if valid
}

// This function is used to convert the CSV string comming from the database to a tags array for rendering
export function csvToArray(csv: unknown): string[] {
  if (typeof csv !== "string") return []; // not a string → return empty array

  return csv
    .split(",") // split by comma
    .map((item) => item.trim()) // trim spaces
    .filter((item) => item.length > 0); // remove empty entries
}

// This functions is used to get the dimensions of an image before uploading
export function getImageDimensionsString(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const dimensionString = `${img.width} × ${img.height} px`;
      resolve(dimensionString);
      URL.revokeObjectURL(objectUrl); // free memory
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  });
}
