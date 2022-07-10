import cors from "cors";
import express from "express";
import { connectToDatabase } from "./db/conn";

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.listen(port, () => {
  connectToDatabase();
  console.log(`Server is running on port: ${port}`);
});
