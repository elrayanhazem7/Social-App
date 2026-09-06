import { useContext } from "react";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { getPosts } from "./posts.api";
import PostCard from "./PostCard/PostCard";
import CreatePost from "./CreatePost/CreatePost";
import { UserTokenProvider } from "../../Context/AuthUserContext/AuthUserContext";
import { useQuery } from "@tanstack/react-query";

export default function Posts() {
  const { userData } = useContext(UserTokenProvider);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center text-red-400">
        <h1 className="text-3xl">{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="mt-26">
        {userData && (
          <>
            <CreatePost user={userData} />
            {data &&
              data.map((post) => (
                <PostCard key={post._id} post={post} isSinglePost={false} />
              ))}
          </>
        )}
      </div>
    </>
  );
}
