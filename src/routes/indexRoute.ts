import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the InventoryAPI",
    creator: "Harsh",
    version: "1.0.0",
    endpoints: [
      {
        path: "/auth",
        methods: ["POST"],
        description: "Authentication routes",
        subroutes: [
          {
            path: "/auth/signup",
            methods: ["POST"],
            description: "User signup",
          },
          {
            path: "/auth/signin",
            methods: ["POST"],
            description: "User signin",
          },
        ],
      },
      {
        path: "/api/product",
        methods: ["GET", "POST", "PUT", "DELETE"],
        description: "Product-related routes",
      },
      {
        path: "/api/user",
        methods: ["GET", "POST", "PUT", "DELETE"],
        description: "User-related routes",
      },
    ],
  });
});

export default indexRouter;
