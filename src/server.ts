import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRouter from "./routes/indexRoute";
import authRouter from "./routes/authRoute";
import apiRouter from "./routes/apiRoute";
import { protectedRoute } from "./module/auth";
import { error404Handler, errorHandler } from "./module/error";

const app = express();

app.use(cors());
app.use(express.static("static"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api", protectedRoute, apiRouter);

app.use(error404Handler);
app.use(errorHandler);

export default app;
