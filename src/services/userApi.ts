// This file has all types and functions used for fetching and updating user data with Supabase

import type { User } from "@supabase/supabase-js";
import supabase from "./supabase";
import toast from "react-hot-toast";
import {
  loadHeic2any,
  normalizeImage,
  resizeImageForStorage,
} from "./imagesApi";

//types

export interface LoginArguments {
  email: string;
  password: string;
  userName?: string;
}

export interface userUpdatedData {
  userName: string;
  bio: string;
  location: string;
  avatar: File | null;
}
/////////////////////////////////////////////////////////////////////////

// functions

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

export async function signUp({ email, password, userName }: LoginArguments) {
  const emailIsTaken = await checkEmailExists(email);

  if (emailIsTaken) {
    toast.error("This email is already taken. Try signing in instead");
    throw Error("Email is taken");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://ma-vault.vercel.app/auth/callback",
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!error) {
    const userId = data.user?.id;
    await supabase.from("users_info").upsert({
      user_id: userId, // FK to auth.users
      user_name: userName,
      email,
    });
  }

  return data;
}

async function checkEmailExists(email: string) {
  const { data, error } = await supabase
    .from("users_info")
    .select()
    .eq("email", email);

  if (error) throw new Error("Couldn't check if email exsists!");

  return data.length > 0;
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

  // Prepare update object
  const updateObj: Record<string, string> = {
    user_name: userName,
    bio,
    location,
  };

  // If avatar exists, upload it and add the URL to update object
  if (avatar) {
    let processedAvatar = avatar;

    // STEP 1: HEIC / HEIF conversion (only if needed)
    if (
      avatar.type === "image/heic" ||
      avatar.type === "image/heif" ||
      avatar.name.toLowerCase().endsWith(".heic")
    ) {
      try {
        // Load heic2any from CDN
        const heic2any = await loadHeic2any();
        const convertedBlob = await heic2any({
          blob: avatar,
          toType: "image/jpeg",
          quality: 1,
        });
        let tempFile = new File(
          [convertedBlob as Blob],
          avatar.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );
        // Normalize colors to sRGB
        tempFile = await normalizeImage(tempFile);
        processedAvatar = tempFile;
      } catch (err) {
        console.error("HEIC conversion failed:", err);
        toast.error("Failed to convert HEIC avatar image!");
        return;
      }
    }

    // STEP 2: Resize and convert to WebP
    try {
      processedAvatar = await resizeImageForStorage(processedAvatar, 500); // Avatar max 500px
    } catch (err) {
      console.error("Avatar resizing failed:", err);
      toast.error("Failed to process avatar image!");
      return;
    }

    // STEP 3: Upload to Supabase
    try {
      // Create new filename with timestamp to distinguish versions
      const fileName = `avatar-${user.id}-${Date.now()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, processedAvatar, { upsert: true });

      if (uploadError) {
        toast.error("Could not upload avatar!");
        throw new Error(`Error uploading avatar: ${uploadError.message}`);
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      if (!data?.publicUrl) throw new Error("Failed to get avatar public URL");
      updateObj.avatar = data.publicUrl;
    } catch (err) {
      console.error("Avatar upload error:", err);
      throw err;
    }
  }

  // STEP 4: Update users_info in database
  const { error } = await supabase
    .from("users_info")
    .update(updateObj)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error("Failed to update user data: " + error.message);
}

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

/* Function to Toggle like state for an image +
   Updates image likes count in DB +
   updates liked_images array in user's metadata */
export async function toggleImageLike(imageId: number) {
  if (!imageId) throw new Error("Invalid image ID");

  // Get user and current image likes in parallel
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

  // Compute new likes
  const likedImages: number[] = user.user_metadata?.liked_images || [];

  const alreadyLiked = likedImages.includes(imageId);
  const newLikes = alreadyLiked
    ? Math.max(imageData.likes - 1, 0)
    : imageData.likes + 1;

  // Prepare updates
  const updatedLikedImages = alreadyLiked
    ? likedImages.filter((id) => id !== imageId)
    : [...likedImages, imageId];

  // Run the updates in parallel
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

  // Return the new like state and count
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

// My contact info is fetched dynamically from the database in this app
export async function fetchMyOwnInfo() {
  const { data: info, error } = await supabase
    .from("my-info")
    .select("email, github, linkedin, portfolio")
    .single();

  if (error) throw new Error(error.message);

  return info;
}
