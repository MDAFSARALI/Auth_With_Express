const mongoose = require('mongoose')

const { Schema } = mongoose;

const JWT =require("jsonwebtoken")
const userSchema = new Schema({
    name: {
        type: String,
        require: [true,"User name is required."],
        minLength: [5, "Name must have at least length 5"],
        maxLength: [50, "Name must be less than 50 character"],
        trim: true
    },
    email: {
        type: String,
        require: [true, "User email is require"],
        unique: true,
        lowercase: true,
        unique: [true, "Already registered."]
    },
    password: {
        type: String,
        select: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgetPasswordExpiryDate: {
        type: Date
    }
},
    {
        timeStamp: true
    });



    userSchema.methods={
        jwtToken(){
            return JWT.sign(
                {id:this._id , email:this.email},
                process.env.SECRET,
                {expiresIn:'24h'}
            )
        }
    }
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;