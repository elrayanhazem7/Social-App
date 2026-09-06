import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getSinglePost } from "./postDetails.api";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import PostCard from "../Posts/PostCard/PostCard";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postDetails" , id],
    queryFn: () => getSinglePost(id!),
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
      {data && (
        <div className="pt-20 w-11/12 md:w-10/12 ">
          <PostCard post={data} isSinglePost={true} />
        </div>
      )}
    </>
  );
}
