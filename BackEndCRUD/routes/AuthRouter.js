import express from "express";
import { loginValidation, signUpValidation } from "../MiddleWare/AuthValidation.js";
import { Login, SignUp } from "../controllers/AuthController.js";
export const router = express.Router();

router.post("/login",loginValidation,Login);

router.post("/signup", signUpValidation, SignUp);
