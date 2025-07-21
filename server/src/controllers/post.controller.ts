import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        dateCreated: "desc",
      },
    });
    res.json(posts);
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, isDeleted, isCompleted } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        description,
        isDeleted: isDeleted ?? false,
        isCompleted: isCompleted ?? false,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isDeleted, isCompleted } = req.body;
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        isDeleted,
        isCompleted,
      },
    });
    res.json(post);
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    await prisma.post.delete({
      where: { id },
    });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
