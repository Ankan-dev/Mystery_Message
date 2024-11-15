import emailTemplate from '../../emails/emailTemplate'
import { resend } from '@/lib/resend'
import { apiResponseTypes } from '@/types/apiResponseTypes'


export async function sendEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<apiResponseTypes>{
    try {

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery Message || Verification Code',
            react: emailTemplate({username,otp:verifyCode})
          });
      


        return {
            success:true,
            message:"Email has been send successfully"
        }
    } catch (error) {
        console.log("error has occured while sending the email: ",error)
        return {
            success:false,
            message:"error has occured while sending the email"
        }
    }
}