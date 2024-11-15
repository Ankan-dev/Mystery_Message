import {Message} from '../model/user'

export interface apiResponseTypes{
    success:boolean,
    message:string,
    isAcceptingMessages?:boolean,
    Messages?:Array<Message>
}