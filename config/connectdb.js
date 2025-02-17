import mongoose from "mongoose";

const connectDB=async(URL)=>{
    try{
        const DB_OPTIONS={
            dbName: "dataB"
        }
        await mongoose.connect(URL, DB_OPTIONS)
        console.log('connected')
    }
    catch(error)
    {
        console.log(error)
    }
}
export default connectDB