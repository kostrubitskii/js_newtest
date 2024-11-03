import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import router from './routes/routes.js'
import cors from 'cors';


const mongoURL = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@kostrubitskii.iq8e7.mongodb.net/?retryWrites=true&w=majority&appName=kostrubitskii`;
console.log(mongoURL);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const server = express();
server.use(cors());
server.use(express.json());
server.use("/", router);

server.listen(3005, () => {
  console.log("app run on server");
});

export default server;
