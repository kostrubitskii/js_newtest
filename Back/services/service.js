import Superhero from "../model/model.js";

export const getAll = async () => Superhero.find();
export const getById = async (id) => Superhero.findById(id);
export const updateById = async (id, newData) => (
  Superhero.findByIdAndUpdate(id, newData, {
    new: true,
  })
);
export const deleteById = async (id) => Superhero.findByIdAndDelete(id);

