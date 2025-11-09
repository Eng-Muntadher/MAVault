import supabase from "./supabase";

// types

interface UploadImageArguments {
  file: File;
  title: string;
  description: string;
  category: string;
  tags: string;
}

export async function getImages() {
  const { data: images, error } = await supabase.from("Images").select("*");

  if (error) throw new Error("Error fetching images");

  //   console.log(images);
  return images;
}

export async function uploadImage({
  file,
  title,
  description,
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
      { title, description, category, tags, url, likes, views, publisher_id },
    ])
    .select();

  if (imageError)
    throw new Error(`Could not upload image ${imageError.message}`);

  return image?.at(0);
}
