import { Button, Input, Label, Spinner, TextField } from "@heroui/react";
import { Check } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router";
import { changePasswordSchema, type ChangePasswordData } from "./changePassword.validation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { changePassword } from "./changePassword.api";

export default function ChangePassword() {

  const navigate = useNavigate()
  const {register , handleSubmit ,reset,formState: { errors, isSubmitting }} = useForm({
    defaultValues : {
      password : '',
      newPassword : ''
    },
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
  })


  const {mutateAsync } = useMutation({
    mutationFn: changePassword,
    onSuccess: (response)=>{
      localStorage.setItem("user_token" ,response.data.token)
      reset();
      navigate('/login')
      toast.success(response.message)
    },
    onError: (response)=>{
      reset();
      toast.error(response.message)
    }
  })

  function handelChangePassword(data :ChangePasswordData){
    mutateAsync(data)
  }

  return (
    <>
      <Form className="w-full max-w-2xl mx-4 sm:mx-6 bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl flex flex-col gap-4 my-26"
      onSubmit={handleSubmit(handelChangePassword)} >
        <h1 className="text-center text-5xl font-bold text-main-color">Change Password</h1>

        {/* Old Password */}
      <TextField
        isRequired
        name="password"
        type="password"
        >
        <Label>Password</Label>
        <Input {...register('password')} placeholder="Your Current Password" 
         className={`${!errors.password && "focus:ring-main-color"}`}
         />
      </TextField>
      {errors.password && (
        <span className="text-red-400 text-xs">{errors.password?.message}</span>
      )}

      {/* New Password */}
      <TextField
        isRequired
        name="newPassword"
        type="password"
        >
        <Label>New Password</Label>
        <Input {...register("newPassword")} placeholder="Enter Your New Password" 
        className={`${!errors.newPassword && "focus:ring-main-color"}`}
        />
      </TextField>
      {errors.newPassword && (
        <span className="text-red-400 text-xs">{errors.newPassword?.message}</span>
      )}

      <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-main-color hover:-translate-y-1 duration-200 transition-transform hover:bg-cyan-500"
                isPending={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner color="current" size="lg" />
                ) : (
                  <>
                    <Check /> Submit
                  </>
                )}
              </Button>
              <Button
                type="reset"
                className="w-full text-main-color bg-red-100 hover:bg-red-600 hover:text-white duration-200 transition-transform hover:-translate-y-1"
              >
                Reset
              </Button>
            </div>
      
    </Form>
    </>
  )
}
