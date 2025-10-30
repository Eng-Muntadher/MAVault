function UploadImageHeading() {
  return (
    <section aria-labelledby="image-upload-heading" className="mb-8">
      <h1
        className="text-(--text-color) text-3xl font-semibold mb-2"
        id="image-upload-heading"
      >
        Upload Image
      </h1>
      <p className="text-(--input-placeholder)">
        Share your creative work with the community
      </p>
    </section>
  );
}

export default UploadImageHeading;
