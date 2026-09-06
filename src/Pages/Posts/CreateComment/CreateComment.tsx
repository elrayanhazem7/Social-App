import { Form, Spinner } from "@heroui/react";
import { DocumentUpload } from "iconsax-reactjs";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addCreatConmment } from "./createComment.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateComment({
  id,
  queryKey,
}: {
  id: string;
  queryKey: string[];
}) {
  const queryClient = useQueryClient();

  const [commentImage, setCommentImage] = useState<string | File>("");
  const [uploadeImageComment, setUploadeImageComment] = useState<string>("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      addCreatConmment(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      
    },
  });

  async function handelCreateComment(data: { content: string }) {
    const formData = new FormData();

    formData.append("content", data.content);

    if (commentImage) {
      formData.append("image", commentImage);
    }

    toast.promise(
      mutateAsync({
        data: formData,
        id,
      }),
      {
        loading: "Comment Creating....",

        success: (message) => {
          reset();
          setCommentImage("");
          setUploadeImageComment("");
          
          return message;
        },

        error: "Failed to create comment",
      },
    );
  }

  const uploadFile = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="mt-5">
        <Form onSubmit={handleSubmit(handelCreateComment)}>
          <div className="flex items-center mt-1">
            <DocumentUpload
              onClick={() => uploadFile.current?.click()}
              size="32"
              className="text-main-color me-2"
            />

            <input
              {...register("image")}
              type="file"
              id="imageFile"
              hidden
              ref={uploadFile}
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setCommentImage(file);
                setUploadeImageComment(URL.createObjectURL(file));
              }}
            />
            <input
              {...register("content")}
              type="text"
              id="input-9"
              className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-main-color focus:outline-none rounded shadow-sm"
              placeholder="Your Comment"
            />
            <button
              type="submit"
              className="h-10 px-4 text-sm bg-mainborder-main-color border border-l-0 border-main-color rounded-r shadow-sm text-white bg-main-color"
            >
              {isPending ? (
                <Spinner color="current" size="md" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              )}
            </button>
          </div>
          {uploadeImageComment && (
            <img
              src={uploadeImageComment}
              className="mx-auto mb-3"
              alt="Post preview"
            />
          )}
        </Form>
      </div>
    </>
  );
}
