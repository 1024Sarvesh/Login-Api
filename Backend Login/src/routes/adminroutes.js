import express from "express";

import checkToken from "../middleware/CheckToken.js";
import adminMiddleware from "../middleware/Admin.js";

import { AllUser } from "../Controllers/AllUsers.js";
import { GetUserById, DeleteUserById } from "../Controllers/User.js";

const router = express.Router();

router.get("/allusers",checkToken,adminMiddleware("admin"),AllUser);

router.get("/users/:id",checkToken,adminMiddleware("admin"),GetUserById);

router.delete("/users/:id",checkToken,adminMiddleware("admin"),DeleteUserById);

export default router;