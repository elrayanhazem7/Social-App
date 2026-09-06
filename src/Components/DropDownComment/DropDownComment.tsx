import { Button, Dropdown, Modal, Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletComment, editComment } from "./dropDownComment.api";
import { useRef, useState } from "react";
import { Form } from "react-router";
import { DocumentUpload } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import type {
  CommentFormData,
  DropDownCommentProps,
} from "./DropDownComment.interface";

export default function DropDownComment({
  commentId,
  userId,
  postId,
}: DropDownCommentProps) {
  const query = useQueryClient();

  // Delete Comment

  const { mutate: handelDeletComment } = useMutation({
    mutationFn: () => deletComment({ commentId, postId }),

    onSuccess: () => {
      toast.success("Comment deleted successfully");

      query.invalidateQueries({
        queryKey: ["allPosts"],
      });

      query.invalidateQueries({
        queryKey: ["getProfilePosts", userId],
      });

      query.invalidateQueries({
        queryKey: ["postDetails", postId],
      });

      query.invalidateQueries({
        queryKey: ["getPostComments", postId],
      });
    },

    onError: () => {
      toast.error("Cannot delete comment");
    },
  });

  // Edit Comment

  const [isOpen, setIsOpen] = useState(false);

  const [commentImage, setCommentImage] = useState<string | File>("");

  const [uploadeImageComment, setUploadeImageComment] = useState<string>("");

  const uploadFile = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<CommentFormData>({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const { mutateAsync, isPending } = useMutation<string, Error, FormData>({
    mutationFn: (formData) =>
      editComment({
        formData,
        postId,
        commentId,
      }),

    onSuccess: async () => {
      setIsOpen(false);

      reset();

      setCommentImage("");
      setUploadeImageComment("");

      await query.invalidateQueries({
        queryKey: ["getPostComments", postId],
      });

      await query.invalidateQueries({
        queryKey: ["allPosts"],
      });

      await query.invalidateQueries({
        queryKey: ["getProfilePosts", userId],
      });

      await query.invalidateQueries({
        queryKey: ["postDetails", postId],
      });

      toast.success("Comment updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handelEditComment(data: CommentFormData) {
    const formData = new FormData();

    formData.append("content", data.content);

    if (commentImage) {
      formData.append("image", commentImage);
    }

    toast.promise(mutateAsync(formData), {
      loading: "Comment Editing....",

      success: (message) => {
        return message;
      },

      error: (error) =>
        error instanceof Error ? error.message : "Failed to edit comment",
    });
  }

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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Button>

        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              if (key === "edit-comment") {
                setIsOpen(true);
              }
            }}
          >
            <Dropdown.Item id="edit-comment" textValue="Edit Comment">
              Edit Comment
            </Dropdown.Item>

            <Dropdown.Item
              id="delete-comment"
              textValue="Delete Comment"
              variant="danger"
              onClick={() => handelDeletComment()}
            >
              Delete Comment
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {/* =========================
          Edit Modal
      ========================= */}

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Edit Your Comment</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <Form onSubmit={handleSubmit(handelEditComment)}>
                  <div className="flex items-center mt-1">
                    {/* Upload */}

                    <DocumentUpload
                      onClick={() => uploadFile.current?.click()}
                      size="32"
                      className="text-main-color me-2"
                    />

                    <input
                      {...register("image")}
                      type="file"
                      hidden
                      ref={uploadFile}
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        setCommentImage(file);

                        setUploadeImageComment(URL.createObjectURL(file));
                      }}
                    />

                    {/* Content */}

                    <input
                      {...register("content")}
                      type="text"
                      className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-main-color focus:outline-none rounded shadow-sm"
                      placeholder="Your Comment"
                    />

                    {/* Submit */}

                    <button
                      type="submit"
                      disabled={isPending}
                      className="h-10 px-4 text-sm border border-l-0 border-main-color rounded-r shadow-sm text-white bg-main-color"
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
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 1 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Image Preview */}

                  {uploadeImageComment && (
                    <img
                      src={uploadeImageComment}
                      className="mx-auto mb-3"
                      alt="Comment preview"
                    />
                  )}
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
