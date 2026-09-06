import { Like1, Message2, Share } from "iconsax-reactjs";
import type { Post } from "../posts.interface";
import CommentCard from "../CommentCard/CommentCard";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostComments, LikePost } from "../posts.api";
import CreateComment from "../CreateComment/CreateComment";
import DropDownActions from "../../../Components/DropDownActions/DropDownActions";
import { useContext } from "react";
import { UserTokenProvider } from "../../../Context/AuthUserContext/AuthUserContext";

type PostCardProps = {
  post: Post;
  isSinglePost: boolean;
};

export function timeAgo(datePost: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(datePost).getTime()) / 1000,
  );

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(months / 12);

  return `${years}y ago`;
}

export default function PostCard({
  post,
  isSinglePost = false,
}: PostCardProps) {
  const { userData } = useContext(UserTokenProvider);
  const query = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getPostComments", post._id],
    queryFn: () => getPostComments(post._id),
  });

  // Like & unLike

  const { data: likedata, mutate: handelLikePost } = useMutation({
    mutationFn: () => LikePost(post._id),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["getProfilePosts"] });
      query.invalidateQueries({ queryKey: ["postDetails", post._id] });
    },
  });

  return (
    <div className="bg-white w-11/12 md:w-10/12 xl:w-full mx-auto p-4 rounded shadow mb-5">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 mb-3">
        <Link to={`/postDetails/${post._id}`}>
          <div className="flex items-center">
            <img
              src={post.user.photo}
              alt={post.user.name}
              className="h-10 w-10 rounded-full"
            />

            <div>
              <p className="font-semibold">{post.user.name}</p>

              <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
            </div>
          </div>
        </Link>
        {userData?._id === post.user._id && (
          <div className="">
            <DropDownActions postId={post._id} userId={userData?._id} />
          </div>
        )}
      </header>
      <p className="mb-3">{post.body}</p>
      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="rounded max-h-96 w-full object-cover mb-3"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between text-gray-600 text-sm font-semibold">
        {/* Like */}
        <button
          onClick={() => handelLikePost()}
          className={`flex items-center gap-1 hover:text-main-color transition-colors ${likedata?.data.data.liked ? "text-main-color" : ""}`}
        >
          <Like1 size="20" />

          <span>
            {post.likesCount > 0 && post.likesCount}
            {post.likesCount > 0 ? " Like" : "Like"}
          </span>
        </button>

        {/* Comment */}
        <Link to={`/postDetails/${post._id}`}>
          <button className="flex items-center gap-1 hover:text-main-color transition-colors">
            <Message2 size="20" />
            <span>
              {post.commentsCount > 0
                ? `${post.commentsCount} Comment`
                : "Comment"}
            </span>
          </button>
        </Link>

        {/* Share */}
        <button className="flex items-center gap-1 hover:text-main-color transition-colors">
          <Share size="20" />

          <span>
            {post.sharesCount > 0 ? `${post.sharesCount} Share` : "Share"}
          </span>
        </button>
      </div>
      {/* Create Comment */}
      <CreateComment
        key={post._id}
        queryKey={isSinglePost ? ["getPostComments"] : ["allPosts"]}
        id={post._id}
      />
      {/* Top Comment */}
      {isSinglePost == false && post.topComment && (
        <CommentCard postId={post._id} comment={post.topComment} />
      )}

      {/* all comments */}
      {isSinglePost == true &&
        data?.data.data.comments.map((comment) => {
          return <CommentCard postId={post._id} key={comment._id} comment={comment} />;
        })}
    </div>
  );
}
