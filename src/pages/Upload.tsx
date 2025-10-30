import UploadImageHeading from "../components/UploadImageHeading";
import UploadImageForm from "../components/UploadImageForm";
import BackButton from "../components/BackButton";

function Upload() {
  return (
    <div className="bg-(--landing-page-bg) pt-8 border-t border-b border-gray-200 backdrop-blur-md mb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton text="Back" />
        <UploadImageHeading />
        <UploadImageForm />
      </div>
    </div>
  );
}

export default Upload;
