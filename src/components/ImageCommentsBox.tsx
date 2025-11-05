import userImage from "../assets/guest.jpeg";
import Input from "../components/Input";
import ImageComment from "./ImageComment";

function ImageCommentsBox() {
  return (
    <section
      aria-label="comments"
      className="rounded-[0.875rem] border border-black/10 bg-white shadow-lg p-6 mb-10 max-[1140px]:mb-0"
    >
      <h2 className="text-2xl text-(--text-color) mb-6">Comments (2)</h2>

      <div className="flex gap-2 mb-10">
        <img
          loading="lazy"
          src={userImage}
          alt="user image"
          className="w-10 h-fit rounded-full"
        />
        <form className="grow">
          <Input
            type="textarea"
            id="comment"
            name="comment"
            onChange={() => {}}
            addedClasses="min-h-[4rem] w-full"
            placeholder="Add a comment..."
          />
          <button className="py-2 px-4 mt-1 text-sm text-white bg-[#030213] opacity-50 rounded-lg cursor-pointer hover:opacity-70 transition-opacity duration-200">
            Post Comment
          </button>
        </form>
      </div>

      <ImageComment
        userImage={userImage}
        userName="janesmithx"
        date="15"
        commentText="Absolutely stunning composition! The lines are perfect."
      />

      <ImageComment
        userImage={userImage}
        userName="arty99"
        date="15"
        commentText="This is amazing work. Love the modern aesthetic!"
      />
    </section>
  );
}

export default ImageCommentsBox;
