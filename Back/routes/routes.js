import express from "express";
import {
  createSuperhero,
  deleteSuperhero,
  getSuperheroById,
  getSuperheroes,
  updateSuperhero,
} from "../controllers/controller.js";
import { uploadImage } from "../controllers/upload.js";

const router = express.Router();

router.post("/heroes", uploadImage, createSuperhero);
router.get("/heroes", getSuperheroes);
router.get("/heroes/:id", getSuperheroById);
router.patch("/heroes/:id", uploadImage, updateSuperhero);
router.delete("/heroes/:id", deleteSuperhero);

export default router;