import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "unauthorized user!",
      });
    }

    const result = await PostService.createPost(req.body, user.id as string);
    res.status(201).json(result);
  } catch (error) {
    console.log("Full Error ", error);
    res.status(400).json({
      error: "Post created failed",
      details: error,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchPost = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const result = await PostService.getAllPosts({ search: searchPost, tags });
    res.status(200).json(result);
  } catch (error) {
    console.log("Full Error ", error);
    res.status(400).json({
      error: "Get pots failed",
      details: error,
    });
  }
};

export const PostController = {
  createPost,
  getAllPost,
};
