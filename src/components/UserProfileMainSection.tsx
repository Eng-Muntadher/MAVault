import { Calendar, MapPin, Settings } from "lucide-react";
import { motion } from "framer-motion";
import guestImage from "../assets/guest.jpeg";
import UserStatsCardsList from "../components/UserStatsCardsList";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useUser } from "../hooks/useUser";

// interface userData {}

function UserProfileMainSection() {
  const { data: user } = useUser();
  const userId = user?.id;

  const { data: userInfo } = useGetUserInfo(userId || "");

  const navigate = useNavigate();

  const uploadedImagesCount = user?.user_metadata?.uploads_images?.length;
  const likedImagesCount = user?.user_metadata?.liked_images?.length;
  const savedImagesCount = user?.user_metadata?.saved_images?.length;
  const commentsOnImagesCount = user?.user_metadata?.comments_images?.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby="user-profile-heading"
      className="bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 px-40 py-16 max-sm:px-6 max-xl:px-6"
    >
      <div className="flex gap-6 items-start mb-8 max-md:flex-col max-md:items-center max-md:text-center">
        <img
          src={userInfo?.at(0)?.avatar || guestImage}
          alt="User Image"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2 grow">
          <div className="flex items-center justify-between max-md:justify-center">
            <h1 className="text-4xl text-white" id="user-profile-heading">
              {userInfo?.at(0)?.user_name}
            </h1>

            <button
              className="flex items-center gap-2 bg-[#ECEEF2] px-3 py-2 rounded-lg text-sm font-semibold max-md:hidden hover:bg-[#cccdd1] cursor-pointer transition-all ease-in duration-100 focus:outline-none focus:ring-4 focus:ring-[#155dfc]"
              onClick={() => navigate("/user-settings")}
            >
              <Settings size={16} aria-hidden="true" />
              Edit Profile
            </button>
          </div>
          <p className="text-(--text-color-secondary) mb-2">{user?.email}</p>
          <p className="text-white opacity-90 mb-2">{userInfo?.at(0)?.bio}</p>
          <div className="flex gap-4 flex-wrap max-[350px]:justify-center">
            <div className="flex gap-2 items-center text-white">
              <MapPin size={16} aria-hidden="true" />
              <span className="text-(--text-color-secondary) text-sm">
                {userInfo?.at(0)?.location || "Add loaction..."}
              </span>
            </div>

            <div className="flex gap-2 items-center text-white">
              <Calendar size={16} />
              <span className="text-(--text-color-secondary) text-sm">
                Joined
                {user?.confirmed_at
                  ? dayjs(user.confirmed_at).format("MMMM D, YYYY")
                  : "Unknown"}
              </span>
            </div>
          </div>
          <button
            className="hidden items-center gap-2 bg-[#ECEEF2] hover:bg-[#cccdd1] px-3 py-2 rounded-lg text-sm font-semibold max-md:flex w-fit mx-auto mt-4 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/user-settings")}
          >
            <Settings size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      <UserStatsCardsList
        uploads={uploadedImagesCount}
        likes={likedImagesCount}
        saved={savedImagesCount}
        comments={commentsOnImagesCount}
      />
    </motion.section>
  );
}

export default UserProfileMainSection;
