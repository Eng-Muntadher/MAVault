import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "lucide-react";
import Input from "./Input";
import { type FileRejection } from "react-dropzone";
import { useUploadImage } from "../hooks/useUploadImage";
import LoadingSpinner from "./LoadingSpinner";
import CustomSelect from "./CustomSelect";
import toast from "react-hot-toast";
import { getImageDimensionsString, validateCSV } from "../services/imagesApi";

function UploadImageForm() {
  const [title, setTitle] = useState("");
  const [describtion, setDescription] = useState("");
  const [category, setCategory] = useState("Sky");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const { uploadImage, isPending } = useUploadImage();

  const maxSize = 10 * 1024 * 1024; // 10MB
  const acceptedFormats = {
    "image/png": [],
    "image/jpeg": [],
    "image/jpg": [],
    "image/gif": [],
    "image/webp": [],
  };

  function onDrop(acceptedFiles: File[], fileRejections: FileRejection[]) {
    // Reset error
    setFileError("");

    // Handle rejected files
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      if (error.code === "file-too-large") {
        setFileError("File is too large. Maximum size is 10MB.");
      } else if (error.code === "file-invalid-type") {
        setFileError(
          "Invalid file type. Only PNG, JPG, GIF, WEBP are allowed."
        );
      } else {
        setFileError(error.message);
      }
      setFile(null);
      return;
    }

    // Accept file
    setFile(acceptedFiles[0]);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxSize,
    multiple: false,
  });

  // Derived state for form validation
  const checkBeforeSubmit =
    title.trim() !== "" && category.trim() !== "" && !!file;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (checkBeforeSubmit) {
      console.log(checkBeforeSubmit);
      const isTagsCSV = validateCSV(tags);
      if (!isTagsCSV) {
        toast.error(
          "Please make sure the image tags are in correct format! (No repetition allowed)"
        );
        return;
      }

      // file is guaranteed to exist due to checkBeforeSubmit
      const dimensions = await getImageDimensionsString(file!);
      uploadImage({ title, describtion, category, tags, file, dimensions });
      handleReset();
    } else {
      toast.error("Please fill all the required fields and select an image!");
    }
  }

  function handleReset() {
    setTitle("");
    setDescription("");
    setCategory("");
    setTags("");
    setFile(null);
    setFileError("");
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {isPending && <LoadingSpinner />}
      <div className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) p-6">
        <h2 className="text-(--text-color) font-semibold mb-1.5">
          Upload Image
        </h2>
        <label
          htmlFor="image-input"
          className="block text-(--input-placeholder-2) mb-6"
        >
          Select an image file from your device
        </label>

        <fieldset
          className={`flex flex-col items-center border-2 border-dashed border-(--drag-upload-border) rounded-[0.875rem] p-12 bg-(--drag-upload-bg) hover:bg-(--drag-drop-upload-bg) hover:border-blue-400 focus:outline-none focus:bg-(--drag-drop-upload-bg) focus:border-blue-400 transition-all duration-200 cursor-pointer text-center max-sm:p-8 
            ${
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-(--drag-upload-border)"
            }`}
          {...getRootProps()}
        >
          {/* This legend is for screen readers only */}
          <legend className="sr-only">Image Upload</legend>

          <input {...getInputProps()} id="image-input" />
          <UploadIcon
            aria-hidden="true"
            size={72}
            className="purple-bg rounded-full text-white p-4 mb-4"
          />

          {file ? (
            <p className="font-semibold mb-2 text-(--text-color)">
              {file.name}
            </p>
          ) : (
            <p className="mb-2">
              <span className="text-(--selected-btn-pagination) underline">
                Click to upload
              </span>{" "}
              <span className="text-(--text-color)">or drag and drop</span>
            </p>
          )}

          <p className="text-sm text-[#4A5565]">
            PNG, JPG, GIF, WEBP up to 10MB
          </p>

          {fileError && <p className="text-red-600 mt-2">{fileError}</p>}
        </fieldset>
      </div>

      <fieldset className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) p-6">
        {/* This legend is for screen readers only */}
        <legend className="sr-only">Image details</legend>

        <h2 className="text-(--text-color) font-semibold mb-1.5">
          Image Details
        </h2>
        <p className="block text-(--input-placeholder-2) mb-6">
          Provide information about your image
        </p>

        <label
          htmlFor="image-title"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Title <span className="text-red-600 ">*</span>
        </label>
        <Input
          type="text"
          value={title}
          id="image-title"
          name="image-title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          addedClasses="text-sm w-full mb-4"
          placeholder="Give your image a title"
        />

        <label
          htmlFor="image-description"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Description
        </label>
        <Input
          type="textarea"
          value={describtion}
          id="image-description"
          name="image-description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          addedClasses="text-sm w-full mb-4 min-h-16"
          placeholder="Describe your image..."
        />

        <label
          htmlFor="image-category"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Category <span className="text-red-600">*</span>
        </label>
        <CustomSelect
          optionsArray={["Sky", "Nature", "Portrait", "Urban"]}
          onChange={(x) => setCategory(x)}
          addedClasses="text-sm w-full mb-4 bg-(--input-color)"
        />

        <label
          htmlFor="image-tags"
          className="block text-(--text-color) text-sm font-semibold mb-2"
        >
          Tags
        </label>
        <Input
          type="text"
          value={tags}
          id="image-tags"
          name="image-tags"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value)
          }
          addedClasses="text-sm w-full mb-2"
          placeholder="landscape, mountain, sunset (comma-seperated)"
        />
        <p className="text-xs text-[#6A7282]">
          Separate tags with commas to help others discover your image
        </p>
      </fieldset>

      <div className="flex gap-3 justify-end mb-6">
        <button
          type="button"
          className="py-2 px-4 text-sm font-semibold rounded-lg border border-(--border-color) bg-white cursor-pointer hover:bg-[#e9ebef] transition-and-focus-ring"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center text-sm font-semibold gap-2 py-2 px-3 btn-bg text-(--text-color-2) rounded-lg cursor-pointer disabled:opacity-50 transition-and-focus-ring"
        >
          <UploadIcon size={16} aria-hidden="true" /> Upload Image
        </button>
      </div>
    </form>
  );
}

export default UploadImageForm;
