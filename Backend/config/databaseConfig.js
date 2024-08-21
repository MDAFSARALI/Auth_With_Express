const mongoose = require('mongoose');

const MONGODB_URL=process.env.MONGODB_URL || "mongodb+srv://generaluserknown:pHLdVFLVPe0ekJiC@cluster0.wjrjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const databaseConnect=()=>{
    mongoose
        .connect(MONGODB_URL)
        .then ((connect)=>console.log(`Connected to DB : ${connect.connection.host}`))
        .catch((err)=>console.log(err.message));
}

module.exports=databaseConnect