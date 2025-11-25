import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "lucide-react";
import { useUploadImage } from "../hooks/useUploadImage";
import {
  getImageDimensionsString,
  normalizeImage,
  validateCSV,
} from "../services/imagesApi";
import { type FileRejection } from "react-dropzone";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import CustomSelect from "./CustomSelect";
import toast from "react-hot-toast";

function UploadImageForm() {
  const [title, setTitle] = useState("");
  const [describtion, setDescription] = useState("");
  const [category, setCategory] = useState("Sky");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [charCount, setCharCount] = useState(0);

  // state to indicate if there is an error with file upload
  const [fileError, setFileError] = useState("");

  // This state indicates loading state only if the user uploads an image that needs transforming (like HEIC)
  const [isConverting, setIsConverting] = useState(false);

  const { uploadImage, isPending } = useUploadImage();

  const maxSize = 10 * 1024 * 1024; // 10MB

  const acceptedFormats = {
    "image/png": [],
    "image/jpeg": [],
    "image/jpg": [],
    "image/gif": [],
    "image/webp": [],
    "image/heic": [], // added
    "image/heif": [], // added
  };

  // Load heic2any from CDN
  async function loadHeic2any() {
    if ((window as any).heic2any) {
      return (window as any).heic2any;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.js";
      script.onload = () => {
        resolve((window as any).heic2any);
      };
      script.onerror = () => {
        reject(new Error("Failed to load heic2any library"));
      };
      document.head.appendChild(script);
    });
  }

  // Drag and drop event handler
  async function onDrop(
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) {
    setFileError("");

    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      if (error.code === "file-too-large") {
        setFileError("File is too large. Maximum size is 10MB.");
      } else if (error.code === "file-invalid-type") {
        setFileError(
          "Invalid file type. Only PNG, JPG, GIF, WEBP, HEIC are allowed."
        );
      } else {
        setFileError(error.message);
      }
      setFile(null);
      return;
    }

    let fileToUse = acceptedFiles[0];

    // HEIC / HEIF conversion (only if needed)
    if (
      fileToUse.type === "image/heic" ||
      fileToUse.type === "image/heif" ||
      fileToUse.name.toLowerCase().endsWith(".heic")
    ) {
      try {
        toast.loading("Converting HEIC image...", { id: "heic" });
        setIsConverting(true);

        // Load heic2any from CDN
        const heic2any = await loadHeic2any();

        const convertedBlob = await heic2any({
          blob: fileToUse,
          toType: "image/jpeg",
          quality: 1,
        });

        let tempFile = new File(
          [convertedBlob as Blob],
          fileToUse.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );

        // Normalize colors to sRGB
        tempFile = await normalizeImage(tempFile);

        fileToUse = tempFile;

        toast.success("Image converted and ready!", { id: "heic" });
      } catch (err) {
        console.error("HEIC conversion failed:", err);
        toast.error("Failed to convert HEIC image.");
        setIsConverting(false);
        return;
      }
      setIsConverting(false);
    }

    setFile(fileToUse);
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
    if (charCount > 45) {
      toast.error(
        "Please make sure the description length is not more than 45 characters!"
      );
      return;
    }

    if (checkBeforeSubmit) {
      const isTagsCSV = validateCSV(tags);
      if (!isTagsCSV) {
        toast.error(
          "Please make sure the image tags are in correct format! (No repetition allowed and at least one must be provided)"
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
      {(isPending || isConverting) && <LoadingSpinner />}
      <div className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) p-6 delay">
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
          className={`flex flex-col items-center border-2 border-dashed border-(--drag-upload-border) delay rounded-[0.875rem] p-12 bg-(--drag-upload-bg) hover:bg-(--drag-drop-upload-bg) hover:border-blue-400 focus:outline-none focus:bg-(--drag-drop-upload-bg) focus:border-blue-400 transition-all duration-200 cursor-pointer text-center max-sm:p-8 
            ${
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-(--drag-upload-border)"
            }`}
          {...getRootProps()}
        >
          {/* This legend is for screen readers only */}
          <legend className="sr-only">Image Upload</legend>

          {/* Hidden input */}
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
                Click to upload{" "}
              </span>

              <span className="text-(--text-color)">or drag and drop</span>
            </p>
          )}

          <p className="text-sm text-[#4A5565]">
            PNG, JPG, GIF, WEBP up to 10MB
          </p>

          {fileError && <p className="text-red-600 mt-2">{fileError}</p>}
        </fieldset>
      </div>

      <fieldset className="rounded-[0.875rem] border border-(--border-color) bg-(--text-color-2) p-6 delay">
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
          maxLength={25}
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
            setCharCount(e.target.value.length);
          }}
          addedClasses="text-sm w-full min-h-16"
          placeholder="Describe your image..."
        />

        <p className="text-[#6A7282] text-xs mb-4">{charCount}/45 characters</p>

        <span className="block text-(--text-color) text-sm font-semibold mb-2">
          Category <span className="text-red-600">*</span>
        </span>
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
          className="flex items-center text-sm font-semibold gap-2 py-2 px-3 btn-bg text-white rounded-lg cursor-pointer disabled:opacity-50 transition-and-focus-ring"
        >
          <UploadIcon size={16} aria-hidden="true" /> Upload Image
        </button>
      </div>
    </form>
  );
}

export default UploadImageForm;
