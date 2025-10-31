import { Calendar, MapPin, Settings } from "lucide-react";
import guestImage from "../assets/guest.jpeg";
import UserStatsCardsList from "../components/UserStatsCardsList";

function UserProfileMainSection() {
  return (
    <section
      aria-labelledby="user-profile-heading"
      className="landing-bg px-40 py-16 max-sm:px-6 max-xl:px-6"
    >
      <div className="flex gap-6 items-start mb-8 max-md:flex-col max-md:items-center max-md:text-center">
        <img
          src={guestImage}
          alt="User Image"
          className="w-32 h-32 rounded-full"
        />
        <div className="flex flex-col gap-2 grow">
          <div className="flex items-center justify-between max-md:justify-center">
            <h1 className="text-4xl text-white" id="user-profile-heading">
              johndoe
            </h1>
            <button className="flex items-center gap-2 bg-[#ECEEF2] px-3 py-2 rounded-lg text-sm font-semibold max-md:hidden">
              <Settings size={16} aria-hidden="true" />
              Edit Profile
            </button>
          </div>
          <p className="text-(--text-color-secondary) mb-2">john@example.com</p>
          <p className="text-white opacity-90 mb-2">
            Professional photographer and visual artist
          </p>
          <div className="flex gap-4 flex-wrap max-[350px]:justify-center">
            <div className="flex gap-2 items-center text-white">
              <MapPin size={16} aria-hidden="true" />
              <span className="text-(--text-color-secondary) text-sm">
                New York, USA
              </span>
            </div>

            <div className="flex gap-2 items-center text-white">
              <Calendar size={16} />{" "}
              <span className="text-(--text-color-secondary) text-sm">
                Joined January 15, 2023
              </span>
            </div>
          </div>
          <button className="hidden items-center gap-2 bg-[#ECEEF2] px-3 py-2 rounded-lg text-sm font-semibold max-md:flex w-fit mx-auto mt-4">
            <Settings size={16} />
            Edit Profile
          </button>{" "}
        </div>
      </div>
      <UserStatsCardsList />
    </section>
  );
}

export default UserProfileMainSection;
