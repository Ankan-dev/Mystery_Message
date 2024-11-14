import { z } from "zod";

export const messageSchema=z.object({
   content:z.string().min(10,"The message should be minimum of 6 characters").max(400,{message:"The message can't be more than 400 characters"})
})