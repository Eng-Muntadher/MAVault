import { motion } from "framer-motion";
import guestImage from "../assets/guest.jpeg";
import Input from "../components/Input";
import ImageComment from "./ImageComment";
import { useGetComments } from "../hooks/useGetComments";
import { usePostComment } from "../hooks/usePostComment";
import { useState } from "react";

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import SmallSpinner from "./SmallSpinner";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useUser } from "../hooks/useUser";

// Extend Day.js with relativeTime plugin
dayjs.extend(relativeTime);

function ImageCommentsBox({ imageId }: { imageId: number }) {
  const [comment, setComment] = useState("");

  // Get the currently signed in user (if there is one)
  const { data: user } = useUser();

  // Fetch the current signed in user's data from the users-info table and cach it
  const { data: userInfo } = useGetUserInfo(user?.id || "");

  // Fetch all comments for this image and cach it
  const { data: comments, isPending } = useGetComments(imageId);

  const { postComment, isPending: isCommenting } = usePostComment(imageId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please fill the comment section!");
      return;
    }

    postComment({ imageId, comment });
    setComment("");
  }

  // Format the date format fetched for each comment
  function formatDate(dateString: string) {
    const date = dayjs(dateString);
    const now = dayjs();

    // Display "Today" if the date is the same day, otherwise "X days ago"
    return date.isSame(now, "day") ? "Today" : date.fromNow();
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      aria-label="comments"
      className="rounded-[0.875rem] border border-(--border-color) bg-(--comments-section-bg) shadow-lg p-6 mb-10 max-[1140px]:mb-0"
    >
      <h2 className="text-2xl text-(--text-color) mb-6">
        {isPending ? "Loading..." : `Comments (${comments?.length})`}
      </h2>

      <div className="flex gap-2 mb-10">
        <img
          loading="lazy"
          src={userInfo?.at(0)?.avatar || guestImage}
          alt="user image"
          className="w-10 h-10 rounded-full object-cover"
        />
        <form className="grow" onSubmit={handleSubmit}>
          <Input
            type="textarea"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setComment(e.target.value);
            }}
            addedClasses="min-h-[4rem] w-full"
            placeholder="Add a comment..."
          />
          <button className="py-2 px-4 mt-1 text-sm text-white bg-(--post-comment-bg) opacity-50 rounded-lg cursor-pointer hover:opacity-70 transition-and-focus-ring">
            {isCommenting ? <SmallSpinner /> : "Post Comment"}
          </button>
        </form>
      </div>

      {comments?.map((comment) => (
        <ImageComment
          key={comment?.created_at}
          userId={comment?.user_id}
          date={formatDate(comment?.created_at)}
          commentText={comment.comment}
        />
      ))}
    </motion.section>
  );
}

export default ImageCommentsBox;
