import { useGetUserInfo } from "../hooks/useGetUserInfo";
import guestImage from "../assets/guest.jpeg";

interface ImageCommentProps {
  date: string;
  commentText: string;
  userId: string;
}

function ImageComment({ date, commentText, userId }: ImageCommentProps) {
  const { data } = useGetUserInfo(userId);
  return (
    <article className="flex gap-3 mb-7 items-center">
      <img
        src={data?.at(0)?.avatar || guestImage}
        alt="user image"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="flex gap-2 items-baseline">
          <span className="text-(--text-color) text-sm">
            {data?.at(0)?.user_name}
          </span>

          <time dateTime="" className="text-[#6A7282] text-xs">
            {date}
          </time>
        </div>

        <p className="text-(--nav-links-color) mt-1 max-w-lg">{commentText}</p>
      </div>
    </article>
  );
}

export default ImageComment;
