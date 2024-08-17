import { Router } from "express";
import { prisma } from "../db";
import {
  validateUpdateForPut,
  validateUpdateForPost,
} from "../module/validation";

const updateRouter = Router();

updateRouter.get("/", async (req, res) => {
  const { id } = req.user;
  const products = await prisma.product.findMany({
    where: {
      belongsToID: id,
    },
    include: { updates: true },
  });

  //! We must avoid such server side operations
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.status(200).json({ message: "All updates", data: updates });
});

updateRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const products = await prisma.product.findMany({
    where: {
      belongsToID: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const update = updates.find((update) => update.id === id);
  if (!update) {
    res.status(404).json({ message: "No such update found" });
    return;
  }
  res.status(200).json({ message: "Unique update", data: update });
});

updateRouter.post("/", validateUpdateForPost, async (req, res) => {
  const { title, body, productID } = req.body;
  const { id } = req.user;

  const product = await prisma.product.findUnique({
    where: {
      id: productID,
      belongsToID: id,
    },
  });

  if (!product) {
    res.status(404).json({ message: "No such product found" });
  }

  await prisma.update.create({
    data: {
      title,
      body,
      product: { connect: { id: product.id } },
      updatedAt: new Date(),
    },
  });

  res.status(200).json({ message: "Update created" });
});

updateRouter.put("/:id", validateUpdateForPut, async (req, res) => {
  const { id } = req.params;
  const products = await prisma.product.findMany({
    where: {
      belongsToID: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === id);
  if (!match) {
    res.status(404).json({ message: "No such update found" });
    return;
  }

  await prisma.update.update({
    where: {
      id,
    },
    data: req.body,
  });
  res.status(200).json({ message: "Updated successfully" });
});

updateRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const products = await prisma.product.findMany({
    where: {
      belongsToID: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === id);
  if (!match) {
    res.status(404).json({ message: "No such update found" });
    return;
  }

  await prisma.update.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ message: "Update deleted" });
});

export default updateRouter;
