import express from "express";
import { register, login } from "../controllers/auth.controller";
import { refreshToken } from "../controllers/refresh.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;