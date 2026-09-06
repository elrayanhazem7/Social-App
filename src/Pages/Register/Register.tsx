import {
  Button,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, useNavigate } from "react-router";

import { regesterSchema, type RegisterDataForm } from "./register.validation";
import { sendUserRegister } from "./register.api";




export default function Register() {


  const {
    handleSubmit,
    register,
    control,
    formState: { errors , isSubmitting },
    reset,
  } = useForm<RegisterDataForm>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "" as "male" | "female",
      password: "",
      rePassword: "",
    },
    mode: "all",
    resolver: zodResolver(regesterSchema),

  });
  
  const navigation = useNavigate()
  async function handelUserSubmit(userData:RegisterDataForm) {
    
    toast.promise(sendUserRegister(userData),{
      loading : "Please Wait....",
      success: function (message:string){
        reset();
        navigation("/login")
        return <h1 className="text-main-color capitalize">{message}</h1> 
      },
      error: function (message:string){
        return <h1 className="text-red-500 capitalize">{message}</h1>
      } ,
    })
    
  }
  return (
    <Form
      className="w-full max-w-2xl mx-4 sm:mx-6 bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl flex flex-col gap-4 my-26"
      onSubmit={handleSubmit(handelUserSubmit)}
    >
      <h1 className="text-center text-5xl font-bold text-main-color">
        Register
      </h1>

      {/* Name Input */}
      <TextField isRequired type="text" isInvalid={!!errors.name}>
        <Label>Name</Label>
        <Input
          {...register("name")}
          placeholder="Write Your Name"
          className={`${!errors.name && "focus:ring-main-color"}`}
        />
        {/* <Input
          {...register("name", {
            required: { value: true, message: "Name Is Required" },
            pattern: {
              value: /^[a-zA-z ]{3,20}$/,
              message: "Enter Valid Name",
            },
          })}
          placeholder="Write Your Name"
          className={`${!errors.name && "focus:ring-main-color"}`}
        /> */}
      </TextField>
      {errors.name && (
        <span className="text-red-400 text-xs">{errors.name?.message}</span>
      )}

      {/*User Name Input */}
      <TextField isRequired type="text" isInvalid={!!errors.username}>
        <Label>User Name</Label>
        <Input
          {...register("username")}
          placeholder="Write Your User Name"
          className={`${!errors.username && "focus:ring-main-color"}`}
        />
        {/* <Input
          {...register("username", {
            required: { value: true, message: "User Name Is Required" },
            pattern: {
              value: /^[a-zA-Z0-9_-]{3,16}$/,
              message: "Enter Valid User Name",
            },
          })}
          placeholder="Write Your User Name"
          className={`${!errors.username && "focus:ring-main-color"}`}
        /> */}
      </TextField>
      {errors.username && (
        <span className="text-red-400 text-xs">{errors.username?.message}</span>
      )}

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
      <TextField isRequired type="text" isInvalid={!!errors.password}>
        <Label>Password</Label>
        <Input
          {...register("password")}
          placeholder="Write Your Password"
          className={`${!errors.password && "focus:ring-main-color"}`}
        />
        
      </TextField>
      {errors.password && (
        <span className="text-red-400 text-xs">{errors.password?.message}</span>
      )}

      {/*Confirm Password Input */}
      <TextField isRequired type="password" isInvalid={!!errors.rePassword}>
        <Label>Confirm Password</Label>
        <Input
          {...register("rePassword")}
          placeholder="Write Your Confirm Password"
          className={`${!errors.rePassword && "focus:ring-main-color"}`}
        />
      </TextField>
      {errors.rePassword && (
        <span className="text-red-400 text-xs">
          {errors.rePassword?.message}
        </span>
      )}
      

      {/*Date OF Birth Input */}
      <TextField isRequired type="date" isInvalid={!!errors.dateOfBirth}>
        <Label>Birth</Label>
        <Input
          {...register("dateOfBirth")}
          placeholder="Write Your Date of Birth"
          className={`${!errors.dateOfBirth && "focus:ring-main-color"}`}
        />
        {/* <Input
          {...register("dateOfBirth", {
            required: { value: true, message: "Date Is Required" },

            validate: function (value) {
              const today = new Date();
              const birthDate = new Date(value);
              const minimumDate = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate(),
              );
              if (birthDate <= minimumDate) {
                return true;
              }
              return "Your Age Must Be At Least 18 Years Old";
            },
          })}
          placeholder="Write Your Date of Birth"
          className={`${!errors.dateOfBirth && "focus:ring-main-color"}`}
        /> */}
      </TextField>
      {errors.dateOfBirth && (
        <span className="text-red-400 text-xs">
          {errors.dateOfBirth?.message}
        </span>
      )}

      {/*Gender Input */}
      <Controller
        name="gender"
        control={control}

        // rules={{
        //   required: { value: true, message: "Gender Is Required" },
        //   // pattern: {value: /"male" | "female"/i ,message: "Gender Is Required"},
        // }}
        render={function ({ field}) {
          return (
            <Select
              className=""
              placeholder="Select one"
              {...field}
              isInvalid={!!errors.gender}
            >
              <Label>Gender</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="male" textValue="male">
                    Male
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item id="female" textValue="female">
                    Female
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              {errors.gender && (
                <span className="text-red-400 text-xs">
                  {errors.gender?.message}
                </span>
              )}
            </Select>
          );
        }}
      />

      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full bg-main-color hover:-translate-y-1 duration-200 transition-transform hover:bg-cyan-500" isPending={isSubmitting}>
          {isSubmitting ? <Spinner color="current" size="lg"/> : <><Check /> Submit</> }
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
