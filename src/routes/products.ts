import express from "express";
import productController from "../controllers/products";
import validateProductUpdate from "../validations/product"

const routes = express.Router();

routes.get("/products", productController.listProducts);
routes.get("/product/:id", productController.byIdProduct);
routes.put("/product/:id", validateProductUpdate, productController.updateProduct);

export default routes