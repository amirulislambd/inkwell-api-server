import { Request, Response } from "express";
import { PostService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helper/paginationSortingHelper";

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

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    const { page, limit, skip, sortBy, orderBy } = paginationSortingHelper(
      req.query,
    );
    const result = await PostService.getAllPosts({
      search: searchPost,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      orderBy,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log("Full Error ", error);
    res.status(400).json({
      error: "Get pots failed",
      details: error,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId || Array.isArray(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const result = (await PostService.getPostById(postId)) as any;

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log("Full Error ", error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Get post failed",
    });
  }
};
export const PostController = {
  createPost,
  getAllPost,
  getPostById,
};
