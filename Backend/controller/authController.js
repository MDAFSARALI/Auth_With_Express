const userModel = require("../model/userSchema");
const emailValidator = require("email-validator")


const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Every Field is required...'
        })
    }


    const validEmail = emailValidator.validate(email);

    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'PLease provide a valid email Id...'
        })
    }

    if (password != confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'password and confirm password does not matched...'
        })
    }







    try {
        const UserInfo = userModel(req.body);
        const result = await UserInfo.save();
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Account already exist with provided email Id.'
            })
        }
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }


}
    const signin=async(req,res)=>{
    const {email,password}=req.body;




    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide the all credentials"
        })
    }

    // Data look up at data base
    try {
        
        const user=await userModel
        .findOne({
            email
        })
        .select('+password');

        if(!user || user.password === password){
            return res.status(400).json({
                success: false,
                message: "Invalid Password."
            })
        }

        const token=user.jwtToken();
        user.password=undefined;

        const cookieOption={
            maxAge:24*60*60*1000,
            httpOnly:true
        };

        res.cookie("token",token,cookieOption);

        res.status(200).json({
            success:true,
            data:user
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            data:error.message
        })
    }
}






const getuser =async(rew,res,next)=>{
    const userId=req.user.id;

    try {
        const user=await userModel.findOne(userId);
        return res.status(200).json({
            success:true,
            data:user
        });
        
    } catch (e) {
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}
module.exports = {
    signup,
    signin,
    getuser
}
