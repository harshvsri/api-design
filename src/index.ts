import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import { protectedRoute } from "./module/auth";
import { signin, signup } from "./handlers/user";
const PORT = 3000;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static("static"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hey there, Welcome to my API..." });
});
app.post("/signup", signup);
app.post("/signin", signin);
app.use("/api", protectedRoute, router);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
