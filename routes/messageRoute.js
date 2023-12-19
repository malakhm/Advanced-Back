import express from "express";
import {
  createMessage,
  getMessage,
  getMessages,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";

const router = express.Router();
router.get("/", getMessages);
router.get("/:id", getMessage);
router.post("/", createMessage);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);

export default router;
