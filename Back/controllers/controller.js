import Superhero from "../model/model.js";
import {
  deleteById,
  getAll,
  getById,
  updateById,
} from "../services/service.js";
import { uploadFile } from "../s3/s3.service.js";

export const createSuperhero = async (req, res) => {
  const images = req.files;
  try {
    console.log(images, 'images');
    const uploadedImages = await Promise.all(images.map(file => uploadFile(file)));
    const superhero = new Superhero({
      ...req.body,
      images: uploadedImages, 
    });

    await superhero.save();
    res.status(201).send(superhero);
  } catch (error) {
    console.error("Помилка при створенні супергероя:", error);
    res.status(400).send(error);
  }
};

export const getSuperheroes = async (req, res) => {
  const superheroes = await getAll();
  res.send(superheroes);
};

export const getSuperheroById = async (req, res) => {
  const { id } = req.params;
  try {
    const superhero = await getById(id);
    if (!superhero) {
      return res.sendStatus(404);
    }
    res.send(superhero);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateSuperhero = async (req, res) => {
  const { id } = req.params;
  const images = req.files || [];
  const existingImages = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];

  try {
    const uploadedImages = await Promise.all(images.map(file => uploadFile(file)));
    const updatedImages = [...existingImages, ...uploadedImages];

    const superhero = await updateById(id, {
      ...req.body,
      images: updatedImages,
    });

    if (!superhero) {
      return res.sendStatus(404);
    }
    res.send(superhero);
  } catch (error) {
    res.status(400).send(error);
  }
};


export const deleteSuperhero = async (req, res) => {
  const { id } = req.params;
  try {
    const superhero = await deleteById(id);
    if (!superhero) {
      return res.sendStatus(404);
    }
    res.send(superhero);
  } catch (error) {
    res.status(400).send(error);
  }
};
