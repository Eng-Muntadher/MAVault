import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";
import guestImage from "../assets/guest.jpeg";
import Input from "./Input";
import { useUpdateUserData } from "../hooks/useUpdateUser";
import LoadingSpinner from "./LoadingSpinner";
import { useUser } from "../hooks/useUser";
import dayjs from "dayjs";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

function UpdateUserInfoForm() {
  const { data: user } = useUser();

  const { data: userData, isPending: isFetchingData } = useGetUserInfo(
    user?.id || ""
  );

  const [image, setImage] = useState<null | string>(null);
  const [userName, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    setImage(userData?.at(0)?.avatar);
    setUsername(userData?.at(0)?.user_name);
    setBio(userData?.at(0)?.bio);
    setLocation(userData?.at(0)?.location);
    setCharCount(userData?.at(0)?.bio?.length);
  }, [userData]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { updateUserData, isPending } = useUpdateUserData();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateUserData({ avatar, userName, bio, location });
    handleReset();
  }

  function handleReset() {
    setImage(null);
    setUsername("");
    setBio("");
    setLocation("");
  }

  const handleFocus = () => {
    inputRef.current?.click(); // focuses on the image file input
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8">
      {isPending && <LoadingSpinner />}

      <fieldset className="rounded-[0.875rem] border border-[rgba(0,0,0,0.1)] p-6">
        {/* This legend is for screen readers only */}
        <legend className="sr-only">User image</legend>

        <h2 className="text-(--text-color) font-semibold mb-1.5">
          Profile Picture
        </h2>
        <label
          htmlFor="image"
          className="block text-(--input-placeholder-2) mb-6"
        >
          Click on your avatar to upload a new profile picture
        </label>

        <div className="flex gap-6 items-center max-[520px]:flex-col max-[520px]:text-center">
          <button
            aria-label="Upload new profile picture"
            type="button"
            className="relative cursor-pointer group"
            onClick={handleFocus}
          >
            <img
              src={image ? image : guestImage}
              alt="Current user image"
              className="w-[92px] h-[92px] rounded-full transition-all duration-300 group-hover:brightness-75"
            />
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn-bg p-2 absolute right-0 bottom-0 text-white rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
            >
              <Plus size={16} aria-hidden="true" />
            </motion.span>

            <input
              ref={inputRef}
              className="hidden"
              id="image"
              name="image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageURL = URL.createObjectURL(file);
                  setImage(imageURL);
                  setAvatar(file);
                }
              }}
              type="file"
              accept="image/*"
              aria-label="Upload user image"
            />
          </button>

          <div>
            <p className="text-(--input-placeholder) text-sm mb-1">
              Recommended: Square image, at least 200x200px
            </p>

            <p className="text-xs text-[#6A7282]">
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-[0.875rem] border border-[rgba(0,0,0,0.1)] p-6">
        {/* This legend is for screen readers only */}
        <legend className="sr-only">Basic user information</legend>

        <h2 className="text-(--text-color) font-semibold mb-1.5">
          Basic Information
        </h2>
        <p className="block text-(--input-placeholder-2) mb-6">
          Update your profile information
        </p>
        <label
          htmlFor="username"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Username
        </label>
        <Input
          type="text"
          disabled={isFetchingData || isPending}
          value={isFetchingData ? "loading..." : userName}
          id="username"
          name="username"
          required={true}
          autoComplete="username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
          addedClasses="text-sm w-full mb-4"
          placeholder="Your username"
        />

        <label
          htmlFor="bio"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Bio
        </label>
        <Input
          type="textarea"
          disabled={isFetchingData || isPending}
          value={isFetchingData ? "loading..." : bio}
          id="bio"
          name="bio"
          autoComplete="bio"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBio(e.target.value);
            setCharCount(e.target.value.length);
          }}
          addedClasses="text-sm w-full min-h-16"
          placeholder="Tell us about yourself..."
        />
        <p className="text-[#6A7282] text-xs mb-3">
          {charCount}/200 characters
        </p>

        <label
          htmlFor="location"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Location
        </label>
        <Input
          type="text"
          disabled={isFetchingData || isPending}
          value={isFetchingData ? "loading..." : location}
          id="location"
          name="location"
          autoComplete="location"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLocation(e.target.value);
          }}
          addedClasses="text-sm w-full mb-4"
          placeholder="City, Country"
        />
      </fieldset>

      <section
        aria-labelledby="account-info-heading"
        className="rounded-[0.875rem] border border-[rgba(0,0,0,0.1)] p-6"
      >
        <h2
          id="account-info-heading"
          className="text-(--text-color) font-semibold mb-1.5"
        >
          Account Information
        </h2>
        <p className="block text-(--input-placeholder-2) mb-6">
          Your account details (read-only)
        </p>

        <label
          htmlFor="email"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Email
        </label>
        <Input
          type="text"
          value={user?.email || "loading..."}
          id="email"
          name="email"
          onChange={() => {}}
          addedClasses="text-sm w-full mb-4 opacity-70 cursor-not-allowed"
          disabled={true}
        />

        <label
          htmlFor="joindate"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Member Since
        </label>
        <Input
          type="text"
          value={
            (user?.confirmed_at
              ? dayjs(user.confirmed_at).format("MMMM D, YYYY")
              : "Unknown") || "loading..."
          }
          id="joindate"
          name="joindate"
          onChange={() => {}}
          addedClasses="text-sm w-full mb-4 opacity-70 cursor-not-allowed"
          disabled={true}
        />
      </section>

      <section aria-label="Action buttons" className="flex gap-3 justify-end">
        <button
          type="button"
          className="py-2 px-4 text-sm font-semibold rounded-lg border border-[rgba(0,0,0,0.10)] bg-white cursor-pointer hover:bg-[#e9ebef] transition-colors duration-200 ease-in-out"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center text-sm font-semibold gap-2 py-2 px-3 btn-bg text-(--text-color-2) rounded-lg cursor-pointer disabled:opacity-50"
        >
          <Save size={16} aria-hidden="true" /> Save Changes
        </button>
      </section>
    </form>
  );
}

export default UpdateUserInfoForm;
