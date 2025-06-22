import express from "express";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 100000,
    },
    {
      name: "TV",
      price: 20000,
    },
  ]);
});

export default router;
