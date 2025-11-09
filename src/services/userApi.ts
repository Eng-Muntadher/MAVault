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

export async function updateUserData(data: userUpdatedData) {
  const { error } = await supabase.auth.updateUser({ data });
  uploadUserImage(data?.avatar);

  if (error) {
    console.error("Failed to update user data:", error);
    throw error; // optional — lets the caller handle it
  }

  return;
}

export async function uploadUserImage(file: File | null) {
  // Ensure a file was provided
  if (!file) return;

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not signed in");

  // Create a unique filename (avoids overwriting)
  const fileName = `avatar-${user.id}-${file.name}`;

  // Upload image to the 'images' bucket
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (uploadError) throw new Error(`Error uploading ${uploadError.message}`);

  // Get the public URL of the uploaded image
  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
  if (!data?.publicUrl) throw new Error(`Failed to get public URL`);

  const url = data.publicUrl;

  // Update user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { ...user.user_metadata, avatarUrl: url },
  });

  if (updateError) throw new Error("Error updating user avatar");
}
