import { Button, Dropdown, Input, Label, Modal } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Form, useNavigate } from "react-router";
import { useRef, useState } from "react";
import { DocumentUpload } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { deletePost, editPost } from "./dropDownActions.api";

export default function DropDownActions({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  let query = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handelDeletPost } = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      toast.success("post deleted succefully");
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["getProfilePosts", userId] });
      navigate("/posts");
    },
    onError: () => {
      toast.error("cannot delete post");
    },
  });

  //   Edit

  const [postImage, setPostImage] = useState<string | File>("");
  const [uploadeImagePost, setUploadeImagePost] = useState<string>("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({
      formData,
      postId,
    }: {
      formData: FormData;
      postId: string;
    }) => editPost(formData, postId),
    onSuccess: function () {
      setIsOpen(false);
      query.invalidateQueries({
        queryKey: ["allPosts"],
      });
      (query.invalidateQueries({ queryKey: ["postDetails", postId] }),
        query.invalidateQueries({
          queryKey: ["getProfilePosts"],
        }));
    },
  });

  async function handelEditPost(data: { body: string }) {
    const formData = new FormData();

    formData.append("body", data.body);

    if (postImage) {
      formData.append("image", postImage);
    }

    toast.promise(mutateAsync({ formData, postId }), {
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
    <>
      <Dropdown>
        <Button aria-label="Menu" className="bg-white border-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-main-color"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              console.log(`Selected: ${key}`);
              if (key === "edit-file") {
                setIsOpen(true);
              }
            }}
          >
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <Label>Edit post</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="delete-post"
              textValue="Delete post"
              variant="danger"
              onClick={() => handelDeletPost()}
            >
              <Label>Delete post</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Edet Your Post</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(handelEditPost)}>
                  <div className="flex items-center gap-3 my-3">
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
              </Modal.Body>
              {/* <Modal.Footer>
                <Button className="w-full" slot="close">
                  Continue
                </Button>
              </Modal.Footer> */}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
