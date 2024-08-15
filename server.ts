import express from "express";
const PORT = 3000;

const app = express();

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hey there..." });
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
