import express from "express";
import {
  signupUser,
  loginUser,
  adminLogin
  
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin);


export default router;