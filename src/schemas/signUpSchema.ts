import { z } from "zod";

export const usernameValidation=z.string()
.min(2,"Username must be minimum of 2 characters")
.max(20,"Username can't be of more that 20 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username can't contain special charaters")

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid Email address"}),
    password:z.string().min(6,{message:"The password should be of 6 charaters"})
})