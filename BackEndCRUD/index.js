import express from "express";
import cors from "cors";
import db from "./models/db.js"; // 👈 this should export a function
import { router as AuthRouter } from "../BackEndCRUD/routes/AuthRouter.js";
import ProductsRouter from "./routes/ProductsRouter.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middlewares
db();
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRouter);

app.use("/api/products", ProductsRouter);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
});
