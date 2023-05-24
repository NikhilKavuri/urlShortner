import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://Nikhil:nikhil3005$1503@cluster0.qnjnaze.mongodb.net/URLshortener`)
.then(()=>{
    console.log("Connection to the database is scuccessful")
})
.catch((err)=>{
    console.log("Error while connecting", err );
})

export default mongoose.connection;