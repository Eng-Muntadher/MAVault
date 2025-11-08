import supabase from "./supabase";

export async function getImages() {
  const { data: images, error } = await supabase.from("Images").select("*");

  if (error) throw new Error("Error fetching images");

  //   console.log(images);
  return images;
}
