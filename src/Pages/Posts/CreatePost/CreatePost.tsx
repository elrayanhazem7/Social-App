import { Button, Form, Input } from "@heroui/react";
import type { User } from "../../Login/login.interface";
import { DocumentUpload } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { createUserPost } from "./createPost.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost({ user }: { user: User }) {
  const { photo, name } = user;

  const [postImage, setPostImage] = useState<string | File>("");
  const [uploadeImagePost, setUploadeImagePost] = useState<string>("");
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (formData: FormData) => createUserPost(formData),
    onSuccess: function () {
  queryClient.invalidateQueries({
    queryKey: ["allPosts"],
  });

  queryClient.invalidateQueries({
    queryKey: ["getProfilePosts"],
  });
}
    
  });

  async function handelUserPost(data: { body: string }) {
    const formData = new FormData();

    formData.append("body", data.body);

    if (postImage) {
      formData.append("image", postImage);
    }

    toast.promise(mutateAsync(formData), {
      loading: "Post Creating....",

      success: (message) => {
        reset();
        setPostImage("");
        setUploadeImagePost("");

        return message;
      },

      error: "Failed to create post",
    });
  }

  const uploadFile = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white w-11/12 md:w-10/12 xl:w-full mx-auto p-4 rounded shadow mb-5">
      <Form onSubmit={handleSubmit(handelUserPost)}>

        <h2 className="font-semibold text-center">
          What In Your Mind {name}?
        </h2>

        <div className="flex items-center gap-3 my-3">
          <img
            src={photo}
            alt={name}
            className="h-10 w-10 rounded-full"
          />

          <Input
            {...register("body")}
            type="text"
            placeholder="Create Your Post"
            className="grow focus:ring-main-color"
          />

          <DocumentUpload
            size="32"
            color="#2ccce4"
            onClick={() => uploadFile.current?.click()}
          />
        </div>

        {uploadeImagePost && (
          <img
            src={uploadeImagePost}
            className="mx-auto mb-3"
            alt="Post preview"
          />
        )}

        <Button
          type="submit"
          className="w-full bg-main-color hover:-translate-y-1 duration-200 transition-transform hover:bg-cyan-500"
        >
          Create Post
        </Button>
      </Form>

      <input
        type="file"
        className="hidden"
        ref={uploadFile}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          setPostImage(file);
          setUploadeImagePost(URL.createObjectURL(file));
        }}
      />
    </div>
  );
}