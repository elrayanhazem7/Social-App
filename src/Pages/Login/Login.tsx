import { Button, Input, Label, TextField, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, useNavigate } from "react-router";
import { loginSchema, type LoginDataForm } from "./login.validation";
import { sendUserLogin } from "./login.api";
import { useContext } from "react";
import { UserTokenProvider } from "../../Context/AuthUserContext/AuthUserContext";

export default function Login() {

  const {setUserData} = useContext(UserTokenProvider)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginDataForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });



  const navigation = useNavigate();
  async function handelUserSubmit(userData: LoginDataForm) {
    toast.promise(sendUserLogin(userData), {
      loading: "Please Wait....",
      success: function (response) {
        localStorage.setItem("user_token" ,response.data.token)
        setUserData(response.data.user)
        // response.data.token
        reset();
        navigation("/");
        return <h1 className="text-main-color capitalize">{response.message}</h1>;
      },
      error: function (message: string) {
        return <h1 className="text-red-500 capitalize">{message}</h1>;
      },
    });
  }
  
  return (
    <Form
      className="w-full max-w-2xl mx-4 sm:mx-6 bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl flex flex-col gap-4 my-26"
      onSubmit={handleSubmit(handelUserSubmit)}
    >
      <h1 className="text-center text-5xl font-bold text-main-color">Login</h1>

      {/*Email Input */}
      <TextField isRequired type="email" isInvalid={!!errors.email}>
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="Write Your Email"
          className={`${!errors.email && "focus:ring-main-color"}`}
        />
        {/* <Input
          {...register("email", {
            required: { value: true, message: "Email Is Required" },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter Valid Email",
            },
          })}
          placeholder="Write Your Email"
          className={`${!errors.email && "focus:ring-main-color"}`}
        /> */}
      </TextField>
      {errors.email && (
        <span className="text-red-400 text-xs">{errors.email?.message}</span>
      )}

      {/*Password Input */}
      <TextField isRequired type="password" isInvalid={!!errors.password}>
        <Label>Password</Label>
        <Input
          {...register("password")}
          placeholder="Write Your Password"
          className={`${!errors.password && "focus:ring-main-color"}`}
        />
        {/* <Input
          {...register("password", {
            required: { value: true, message: "Password Is Required" },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message: "Enter Valid Password",
            },
          })}
          placeholder="Write Your Password"
          className={`${!errors.password && "focus:ring-main-color"}`}
        /> */}
      </TextField>
      {errors.password && (
        <span className="text-red-400 text-xs">{errors.password?.message}</span>
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
              <Check /> Login
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
  );
}
