import * as zod from "zod"


export const changePasswordSchema =zod.object({
  password: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,     "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
),
  newPassword: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,     "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
),
})


export type ChangePasswordData = zod.infer<typeof changePasswordSchema>