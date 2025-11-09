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
    .eq("user_id", "39a0020d-a078-4516-a9f7-788a2140e5df")
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
