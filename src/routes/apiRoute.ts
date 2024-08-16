import { Router } from "express";
import { prisma } from "../db";
import { validateProduct } from "../module/validation";

const apiRouter = Router();

/**
 * Product
 */
apiRouter.get("/product", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json({ message: "All products", products });
});

apiRouter.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json({ message: "Unique product", product });
});

apiRouter.post("/product", validateProduct, async (req, res) => {
  const { name } = req.body;
  const { id } = req.user;
  await prisma.product.create({
    data: {
      name,
      belongsToID: id,
    },
  });
  res.status(200).json({ message: "Product created" });
});

apiRouter.put("/product/:id", validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  res.json({ message: "Product updated" });
});

apiRouter.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json({ message: "Product deleted" });
});

/**
 * Update
 */

apiRouter.get("/update", (req, res) => {});

apiRouter.get("/update/:id", (req, res) => {});

apiRouter.post("/update", (req, res) => {});

apiRouter.put("/update/:id", (req, res) => {});

apiRouter.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

apiRouter.get("/updatepoint", (req, res) => {});

apiRouter.get("/updatepoint/:id", (req, res) => {});

apiRouter.post("/updatepoint", (req, res) => {});

apiRouter.put("/updatepoint/:id", (req, res) => {});

apiRouter.delete("/updatepoint/:id", (req, res) => {});

export default apiRouter;
