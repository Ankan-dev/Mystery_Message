import mongoose,{Document,Schema } from "mongoose";


export interface Message extends Document{
    content:string,
    createdAt:Date
}

const messageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

interface User extends Document{
    username:string,
    email:string,
    password:string,
    isValidate:boolean,
    isAcceptingMessages:boolean,
    message:Message[]
}

const userSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"please use valid email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    isValidate:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    message:[messageSchema]
})

const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>('User',userSchema))

export default UserModel




