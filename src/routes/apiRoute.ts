import { Router } from "express";
import productRouter from "./productRoute";
import updateRouter from "./updateRoute";

const apiRouter = Router();

apiRouter.use("/product", productRouter);
apiRouter.use("/update", updateRouter);

export default apiRouter;
