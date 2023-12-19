import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  signInUser,
} from "../controllers/userController.js";
import { upload } from "../configuration/cloudinary.js";

const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", upload.single("image"), createUser);
router.delete("/:id", deleteUser);
router.put("/:id", upload.single("image"), updateUser);
router.post("/sign", signInUser);
export default router;
