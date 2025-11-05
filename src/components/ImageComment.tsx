interface ImageCommentProps {
  userImage: string;
  userName: string;
  date: string;
  commentText: string;
}

function ImageComment({
  userImage,
  userName,
  date,
  commentText,
}: ImageCommentProps) {
  return (
    <article className="flex gap-2 mb-7">
      <img
        src={userImage}
        alt="user image"
        className="w-10 h-fit rounded-full"
      />
      <div>
        <div className="flex gap-2">
          <span className="text-(--text-color) text-sm">{userName}</span>

          <time dateTime="" className="text-[#6A7282] text-xs">
            {date} days ago
          </time>
        </div>

        <p className="text-(--nav-links-color) mt-1 max-w-lg">{commentText}</p>
      </div>
    </article>
  );
}

export default ImageComment;
