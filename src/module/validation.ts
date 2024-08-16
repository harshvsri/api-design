import { body, validationResult } from "express-validator";

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

export const validateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
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
