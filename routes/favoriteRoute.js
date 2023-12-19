import express from "express";
import {
  createFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  getFavoritesByUser,
} from "../controllers/favoriteController.js";

const router = express.Router();
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.get("/user/:UserId", getFavoritesByUser);
router.post("/", createFavorite);
router.delete("/:id", deleteFavorite);

export default router;
