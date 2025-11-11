import supabase from "./supabase";

// types

interface UploadImageArguments {
  file: File;
  title: string;
  describtion: string;
  category: string;
  tags: string;
}

export interface CommentStructure {
  imageId: number;
  comment: string;
}

export async function getImages() {
  const { data, error } = await supabase
    .from("Images")
    .select("*")
    .order("created_at", { ascending: true }); // <-- stable order

  if (error) throw error;
  return data;
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
    .select("*")
    .in("id", currentImageFilter); // Fetch all liked images

  if (error) {
    console.error(error);
  }

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
      { title, describtion, category, tags, url, likes, views, publisher_id },
    ])
    .select()
    .single();
  console.log(image);

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
