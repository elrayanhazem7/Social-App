import * as zod from "zod"


export const loginSchema =zod.object({
  email: zod.email(),
  password: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,     "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
),
})


export type LoginDataForm = zod.infer<typeof loginSchema>