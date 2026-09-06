import * as zod from "zod"


export const regesterSchema =zod.object({
  name: zod.string().regex(/^[a-zA-z ]{3,20}$/ , "Enter Valid Name"),
  username:zod.string().regex(/^[a-zA-Z0-9_-]{3,16}$/ , "Enter Valid User Name"),
  email: zod.email(),
  password: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,     "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
),
  rePassword: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "Enter Valid Repassword"),
  dateOfBirth: zod.string().refine(value => {
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
  },"Your Age Must Be At Least 18 Years Old"),
  gender: zod.enum(["male", "female"]),
}).refine(({password,rePassword})=>{
  if(password === rePassword){
    return true
  }
},{
  error : "Password and Confirm Password Should Be Same",
  path: ["rePassword"]
})


export type RegisterDataForm = zod.infer<typeof regesterSchema>