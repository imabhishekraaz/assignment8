import express from 'express'
import { userController } from '../controllers/user.controller.js';
import { Authentication } from '../auth/auth.js';
export const userRouter = express.Router();

// user register api 
userRouter.post("/register",userController.registerUser);
userRouter.post("/login",userController.loginUser);
userRouter.post('/reset-password', Authentication.verifyJWTToken, userController.resetPassword);

