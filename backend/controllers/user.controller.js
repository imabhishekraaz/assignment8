import { Authentication } from "../auth/auth.js";
import { userModel } from "../models/user.model.js";

class User{
    /*
        Register the user 
        Require the name, password, email, telephone , role 
        Verify the user email, telephone number
    */
    async registerUser(req,res,next){
        try{
            const { name, password, email, telephone, role} = req.body;
            if( !name &&
                !password &&
                !email &&
                !telephone &&
                !role
            ){
                throw new Error("all field are required");
            };
            // check is user alreay exits
            // is NOT exits then regiter the user
            const isExits = await userModel.findOne({telephone, email});
            if(isExits){
                throw new Error("user already exits");
            };
            const user = await userModel.create({name,email,password,telephone,role});
            // paylaod to generate the JWT token
            // we pass the name,email, role
            const payload = {
                name:name,
                email:email,
                role:role,
                id:user._id
            };
            const token = Authentication.generateToken(payload);
            res.status(201).json({
                success: true,
                message:"account created",
                user,
                token
            });
        } catch(error){
            next(error);
        }
    };

    /*
        Reset the user password
        NEED the user previoud password and new password to change the PASSWORD
    */
    async resetPassword(req,res,next){
        try{
            const {oldPassword, newPassword} = req.body;
            const id = req.user.id;

            if(!oldPassword || !newPassword){
                throw new Error("Enter the Password");
            };
            // Find the User if user exits then we change the password
            // IF User is not Exits then throw an Error
            const user = await userModel.findOne({_id:id}).select("+password").lean();
            if(!user){
                throw new Error("Invalid token");
            };
            // check the OldPassword are matched or NOT
            const oldPass = await Authentication.convertTheHashedPassword(oldPassword,user.password);
            console.log(oldPass)
            if(!oldPass){
                throw new Error("Password not matched");
            };
            // Changing the password
            const IsChange = await userModel.findById({_id:id});
            IsChange.password = newPassword;
            await IsChange.save();
            // return the Details
            return res.status(201).json({
                success: true,
                message:"Password updated",
                IsChange
            });
        } catch(error){
            next(error);
        };
    };

    /*  
        login the user 
        we need the telephone and password to login
        we use the OTP-Based login 
    */
    async loginUser(req,res,next){
        try{
            const {telephone,password} = req.body;
            if(!telephone || !password) {
                throw new Error("please fill the details");
            };
            // check if user exits or NOT
            // if user exits then we campare the password
            // if user is not exits then throw an error
            const user = await userModel.findOne({telephone}).select("+password").lean();
            if(!user){
                throw new Error("Please! login first");
            };
            const isPasswordTrue = await Authentication.convertTheHashedPassword(password, user.password);
            if(!isPasswordTrue){
                throw new Error("Password are not matched");
            };
            // generate the token
            // we need the payload to pass in the function so we extract the values from the isExits.
            const payload = {
                name:user.name,
                email:user.email,
                role:user.role,
                id:user._id || user.id
            };
            const token = Authentication.generateToken(payload);
            res.status(200).json({
                success: true,
                message:"logged-in",
                user,
                token
            });
        } catch(error){
            next(error);
        };
    };
};

export const userController = new User();
