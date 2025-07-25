import { Router } from "express";
import {
  updateUser,
  updatePassword,
  updateAvatar,
  getCurrentUser,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, getCurrentUser);
router.patch("/", authenticateToken, updateUser);
router.patch("/password", authenticateToken, updatePassword);
router.patch("/avatar", authenticateToken, updateAvatar);

export default router;
