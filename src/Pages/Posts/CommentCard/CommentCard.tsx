import type { Comment } from "../posts.interface";
import { timeAgo } from "../PostCard/PostCard";
import DropDownComment from "../../../Components/DropDownComment/DropDownComment";
import { useContext } from "react";
import { UserTokenProvider } from "../../../Context/AuthUserContext/AuthUserContext";

type CommentCardProps = {
  comment: Comment;
  postId:string
};

export default function CommentCard({ comment ,  postId,
 }: CommentCardProps) {
  const { userData } = useContext(UserTokenProvider);
  return (
    <div className="border border-gray-400 p-3 mt-3 rounded">
      <header className="flex items-center justify-between space-x-3 mb-3">
        <div className="flex items-center">
          <img
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{comment.commentCreator.name}</p>

            <p className="text-xs text-gray-500">
              {timeAgo(comment.createdAt)}
            </p>
          </div>
        </div>
        {userData?._id === comment.commentCreator._id && 
        <div className="">
          <DropDownComment commentId={comment._id} postId={postId} userId={userData._id}/>
        </div>
        }
      </header>
      {comment.image && (
        <img
          src={comment.image}
          className="mx-auto h-96"
          alt={comment.commentCreator.name}
        />
      )}
      <p className="text-md text-gray-500">{comment.content}</p>
    </div>
  );
}
