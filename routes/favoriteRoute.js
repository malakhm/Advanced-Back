import express from "express";
import {
  createFavorite,
  getFavorites,
  getFavorite,
  deleteFavorite,
  updateFavorite,
  getFavoritesByUser,
} from "../controllers/favoriteController.js";

const router = express.Router();
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.get("/favorites/user/:userId", getFavoritesByUser);
router.post("/", createFavorite);
router.delete("/:id", deleteFavorite);
router.put("/:id", updateFavorite);

export default router;
