import { body, param, validationResult } from "express-validator";
import { prisma } from "../db";

export const validateCredential = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing Credentials", errors: errors.array() });
    }
    next();
  },
];

export const uniqueUsername = async (req, res, next) => {
  const { username } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user) {
    return res.status(409).json({ message: "Username not available" });
  }
  next();
};

export const validateProduct = [
  body("name").exists().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing product details", errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateForPost = [
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productID").exists().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing update details", errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateForPut = [
  body("title").optional(),
  body("body").optional(),
  body("status")
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"])
    .optional(),
  body("version").optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Missing update details", errors: errors.array() });
    }
    next();
  },
];
