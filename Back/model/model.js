import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String, required: true },
  superpowers: { type: String, required: true },
  catch_phrase: { type: String, required: true },
  images: [{ type: String }],
});

const Superhero = mongoose.model("Superhero", superheroSchema);

export default Superhero;