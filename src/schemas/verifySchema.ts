import { z } from "zod";

export const verifySchema=z.object({
   code:z.string().min(6,{message:"The code should be of minimum 6 characters"})
})