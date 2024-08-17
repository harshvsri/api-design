import { Router } from "express";
import { prisma } from "../db";
import { validateProduct } from "../module/validation";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { id } = req.user;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });

  res.status(200).json({ message: "All products", data: user.products });
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id,
      belongsToID: req.user.id,
    },
  });
  if (!product) {
    res.status(404).json({ message: "No such product found" });
    return;
  }
  res.status(200).json({ message: "Unique product", data: product });
});

productRouter.post("/", validateProduct, async (req, res) => {
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

productRouter.put("/:id", validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await prisma.product.update({
    where: {
      id: id,
      belongsToID: req.user.id,
    },
    data: {
      name: name,
    },
  });
  res.json({ message: "Product updated" });
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: {
      id: id,
      belongsToID: req.user.id,
    },
  });
  res.status(200).json({ message: "Product deleted" });
});

export default productRouter;
