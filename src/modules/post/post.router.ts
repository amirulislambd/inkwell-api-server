import express, { Router } from "express";
import { PostController } from "./post.controller";
import authHeder, { userRole } from "../../middlewares/auth";
const router = express.Router();

router.post("/", authHeder(userRole.USER), PostController.createPost);

export default router;
