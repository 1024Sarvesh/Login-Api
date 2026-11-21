import express from "express";
import Signup from "../Controllers/signup.js";
import Login from "../Controllers/login.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;