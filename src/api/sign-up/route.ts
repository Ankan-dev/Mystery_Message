import { resend } from "@/lib/resend";
import { sendEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()

        const existingUserverifiedByUsername = await UserModel.findOne({
            username,
            isValidate: true
        })

        if (existingUserverifiedByUsername) {
            return Response.json({
                message: "Username already taken",
                success: false
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    message: "email is already taken",
                    success: false
                }, {
                    status: 400
                })
            } else {
                existingUserByEmail.username = username;
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode;
                existingUserByEmail.expiryDate = expiryDate

                await existingUserByEmail.save();
            }
        } else {
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: OTP,
                expiryDate: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                message: []
            })

            await newUser.save();
        }

        const sendEmailResponse = await sendEmail(email, username, OTP)

        if (!sendEmailResponse.success) {
            return Response.json({
                message: sendEmailResponse.message,
                success: false
            }, {
                status: 500
            })
        }

        return Response.json({
            message: "User created successfully. Please verify the email",
            success: true
        },
            {
                status: 201
            })

    } catch (error: unknown) {
        return Response.json({
            message: "Error has occured ",
            error: error,
            success: false
        }, {
            status: 500
        })
    }
}

