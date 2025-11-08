import type { User } from "@supabase/supabase-js";
import supabase from "./supabase";

export interface LoginArguments {
  email: string;
  password: string;
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
  if (!data.user?.user_metadata.skills) {
    const { error } = await supabase.auth.updateUser({
      data: { skills: [] },
    });

    if (error) {
      console.error("Error updating metadata:", error);
    }
  }

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
