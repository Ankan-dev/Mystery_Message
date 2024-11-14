import mongoose from "mongoose";


interface connectionObject{
    isConnected?:number
}

const connection:connectionObject={}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Database is already connected");
        return;
    }

    try {
       const db=await mongoose.connect(process.env.MONGO_URI||'',{}) 

       connection.isConnected=db.connections[0].readyState
       console.log("Database is connected successfully");
    } catch (error) {
        console.log("Failed to connect : ",error);
        process.exit(1);
    }
}

export default dbConnect;