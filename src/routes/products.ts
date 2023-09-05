import express from "express";
import productController from "../controllers/products";

const routes = express.Router();

routes.get("/products", productController.listProducts);
routes.get("/product/:id", productController.byIdProduct);
routes.put("/product/:id", productController.updateProduct);

export default routes