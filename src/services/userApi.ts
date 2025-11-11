import type { User } from "@supabase/supabase-js";
import supabase from "./supabase";

export interface LoginArguments {
  email: string;
  password: string;
}

export interface userUpdatedData {
  userName: string;
  bio: string;
  location: string;
  avatar: File | null;
}

export async function login({ email, password }: LoginArguments) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting current user:", error);
    return null;
  }
  return data.user ?? null; // null if no user is logged in
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out failed:", error.message);
    return;
  }
}

export async function updateUserData({
  userName,
  bio,
  location,
  avatar,
}: userUpdatedData) {
  // Get current user once
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not signed in");

  console.log(user.id);

  // Prepare update object
  const updateObj: Record<string, string> = {
    user_name: userName,
    bio,
    location,
  };

  // If avatar exists, upload it and add the URL to update object
  if (avatar) {
    const fileName = `avatar-${user.id}-${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar, { upsert: true });

    if (uploadError)
      throw new Error(`Error uploading avatar: ${uploadError.message}`);

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    if (!data?.publicUrl) throw new Error("Failed to get avatar public URL");

    updateObj.avatar = data.publicUrl;
  }

  console.log(updateObj);
  // Update users_info in one go
  const { error, data: sheep } = await supabase
    .from("users_info")
    .update(updateObj)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error("Failed to update user data: " + error.message);

  console.log(sheep);
}

// export async function uploadUserImage(file: File | null) {
//   // Ensure a file was provided
//   if (!file) return;

//   // Get current user
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();
//   if (userError || !user) throw new Error("User not signed in");

//   // Create a unique filename (avoids overwriting)
//   const fileName = `avatar-${user.id}-${file.name}`;

//   // Upload image to the 'images' bucket
//   const { error: uploadError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, file);

//   if (uploadError) throw new Error(`Error uploading ${uploadError.message}`);

//   // Get the public URL of the uploaded image
//   const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
//   if (!data?.publicUrl) throw new Error(`Failed to get public URL`);

//   const url = data.publicUrl;

//   // Update user metadata
//   const { error: updateError } = await supabase
//     .from("users_info")
//     .update({ avatar: url })
//     .eq("user_id", user.id);

//   if (updateError) throw new Error("Error updating user avatar");
// }

export async function getUserData(userId: string) {
  if (!userId) return;

  const { data, error } = await supabase
    .from("users_info")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error("Unable to fetch user data from users_info");

  return data;
}

export async function getPublishersInfo(userId: string) {
  if (!userId) return;

  const { data, error } = await supabase
    .from("users_info")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error("Unable to fetch user data from users_info");

  return data;
}

/**
 * Toggles like state for a specific image:
 * - Updates image likes count in DB
 * - Updates liked_images array in user's metadata
 */
export async function toggleImageLike(imageId: number) {
  if (!imageId) throw new Error("Invalid image ID");

  // 1️⃣ Get user and current image likes in parallel
  const [
    { data: userData, error: userError },
    { data: imageData, error: fetchError },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("Images").select("likes").eq("id", imageId).single(),
  ]);

  const user = userData?.user;

  if (userError || !user) throw new Error("User not authenticated");
  if (fetchError || !imageData) throw new Error("Image not found");

  // 2️⃣ Compute new likes
  const likedImages: number[] = user.user_metadata?.liked_images || [];

  const alreadyLiked = likedImages.includes(imageId);
  const newLikes = alreadyLiked
    ? Math.max(imageData.likes - 1, 0)
    : imageData.likes + 1;

  // 3️⃣ Prepare updates
  const updatedLikedImages = alreadyLiked
    ? likedImages.filter((id) => id !== imageId)
    : [...likedImages, imageId];

  // 4️⃣ Run the updates in parallel
  const [{ error: updateError }, { error: metaError }] = await Promise.all([
    supabase.from("Images").update({ likes: newLikes }).eq("id", imageId),
    supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        liked_images: updatedLikedImages,
      },
    }),
  ]);

  if (updateError) throw new Error("Failed to update image likes");
  if (metaError) throw new Error("Failed to update user metadata");

  // 5️⃣ Return the new like state and count
  return {
    liked: !alreadyLiked,
    likes: newLikes,
  };
}

export async function bookmarkImage(imageId: number) {
  if (!imageId) return;

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  // Get current the bookmarked images from the user's metadata
  const savedImages = user.user_metadata?.saved_images || [];
  const alreadyBookmarked = savedImages.includes(imageId);

  // Update the user metadata
  const updatedSavedImages = alreadyBookmarked
    ? savedImages.filter((id: number) => id !== imageId)
    : [...savedImages, imageId];

  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      ...user.user_metadata, // keep existing fields
      saved_images: updatedSavedImages, // only update this field
    },
  });

  if (metaError) throw new Error("Failed to update user metadata");
}
