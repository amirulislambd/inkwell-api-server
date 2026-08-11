import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  authorId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId,
    },
  });

  return result;
};

const getAllPosts = async (payload: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
}) => {
  const andOperation: PostWhereInput[] = [];
  if (payload.search) {
    andOperation.push({
      OR: [
        {
          title: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: payload.search as string,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: payload.search as string,
          },
        },
      ],
    });
  }
  if (payload.tags.length > 0) {
    andOperation.push({
      tags: {
        hasEvery: payload.tags,
      },
    });
  }
  if (typeof payload.isFeatured === "boolean") {
    andOperation.push({
      isFeatured: payload.isFeatured,
    });
  }
  if (payload.status) {
    andOperation.push({
      status: payload.status,
    });
  }
  if (payload.authorId) {
    andOperation.push({
      authorId: payload.authorId,
    });
  }
  const result = await prisma.post.findMany({
    where: {
      AND: andOperation,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
};
