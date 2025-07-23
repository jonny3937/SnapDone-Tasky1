import { Request, Response } from "express";
import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, firstName, lastName, avatar } = req.body;
    const userId = (req as any).user.userId;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
        NOT: { id: userId },
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const updateData: any = {
      username,
      email,
      firstName,
      lastName,
    };
    if (avatar !== undefined) {
      updateData.avatar = avatar;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user.userId;

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    
    const passwordStrength = zxcvbn(newPassword);
    if (passwordStrength.score < 2) {
      return res.status(400).json({
        message: "New password is too weak. Please choose a stronger password.",
        suggestions: passwordStrength.feedback.suggestions,
        warning: passwordStrength.feedback.warning,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;
    const userId = (req as any).user.userId;

    console.log("[updateAvatar] Saving avatar:", avatar, "for user:", userId);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatar },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    });
    console.log("[getCurrentUser] Returning avatar:", user?.avatar, "for user:", userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
