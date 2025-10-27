import { Stars } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UploadImageFromExplore() {
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-col items-center pt-8 pb-6 px-6 text-center mt-24 mb-8 text-(--text-color-2) purple-bg rounded-[0.875rem]"
      aria-labelledby="upload-heading"
    >
      <Stars size={48} className="mb-4" aria-hidden="true" />
      <h2 className="text-2xl mb-2" id="upload-heading">
        Want to see your work here?
      </h2>
      <p className="text-(--text-color-secondary) mb-6">
        Upload your best shots and get featured in our explore section
      </p>
      <button
        className="py-3 px-6 text-(--selected-btn-pagination) bg-white rounded-[0.625rem] cursor-pointer 
             shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => navigate("/upload")}
      >
        Upload Your Images
      </button>
    </section>
  );
}

export default UploadImageFromExplore;
