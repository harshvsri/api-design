import express, { Request, Response } from "express";
import router from "./router";
const PORT = 3000;

const app = express();

app.use(express.static("static"));
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hey there, Welcome to my API..." });
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
