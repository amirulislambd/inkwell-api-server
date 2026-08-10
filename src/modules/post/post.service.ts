import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Omit<Post, "id"|"createdAd"|"createdUpdate">)=>{
    const result = await prisma.post.create({
        data
    })
}

export const PostService ={
     createPost
}