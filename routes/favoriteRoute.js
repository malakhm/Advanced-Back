import express from "express";
import {
  createFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  getFavoritesByUser,
} from "../controllers/favoriteController.js";
import Verification from "../Middleware/jwt.js";

const router = express.Router();
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.get("/user/:UserId", Verification.verifyUser,getFavoritesByUser);// user and admin have access
router.post("/", Verification.verifyUser, createFavorite);// user and admin have access
router.delete("/:id", Verification.verifyUser, deleteFavorite);// user and admin have access

export default router;
