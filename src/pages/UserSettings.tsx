import BackButton from "../components/BackButton";
import UpdateUserInfoForm from "../components/UpdateUserInfoForm";

function UserSettings() {
  return (
    <div className="bg-(--landing-page-bg) pt-9 border-t border-b border-gray-200 backdrop-blur-md mb-8 px-4 sm:px-6 lg:px-6">
      <div className="max-w-[832px] mx-auto ">
        <BackButton text="Back to Profile" addedClasses="mb-6 h-9" />
        <h1 className="text-(--text-color) text-3xl mb-8">Profile Settings</h1>

        <UpdateUserInfoForm />
      </div>
    </div>
  );
}

export default UserSettings;
