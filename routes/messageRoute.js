import express from "express";
import {
  createMessage,
  getMessage,
  getMessages,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";
import Verification from "../Middleware/jwt.js";

const router = express.Router();
router.get("/", Verification.verifyLogin,getMessages);
router.get("/:id",  Verification.verifyLogin,getMessage);
router.post("/",  Verification.verifyLogin,createMessage);
router.delete("/:id",  Verification.verifyLogin,deleteMessage);
router.put("/:id",  Verification.verifyLogin,updateMessage);

export default router;
