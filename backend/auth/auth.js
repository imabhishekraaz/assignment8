import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';

class Auth{
    async verifyJWTToken(req,res,next){
        try {
            const authorization = req.headers.authorization;
            if (!authorization || !authorization.startsWith("Bearer ")) {
                throw new Error("Token is missing");
            }
            const token = authorization.split(" ")[1];
            if(!token){
                throw new Error("Invalid token");
            };
            const decode = jwt.verify(token, process.env.JWT_STR);
            // check user exits in the database
            // if NOT exits in the database then throw an error
            const isExits = await userModel.findById(decode.id);
            if(!isExits){
                throw new Error("Token is invalid");
            };
            // save the user INFO in the req body 
            // We can get the additional info about the user by the token
            // we don't need to call the api again to verify the user
            req.user = decode;
            next();
        } catch(error){
            next(error);
        };
    };
    async convertTheHashedPassword(realPassword, hashedPassword){
        const password = await bcrypt.compare(realPassword,hashedPassword);
        return password;
    };

    generateToken(payload){
        return jwt.sign(payload,process.env.JWT_STR,{
            expiresIn:"30d"
        });
    };
};
export const Authentication = new Auth();
