import { Request, Response, Router } from "express";
import productRoutes from "./products"
import { SUCCESS } from "../constants/success";

const routes = Router();

routes.get("/", (req:Request, res:Response) =>{
    return res.json(SUCCESS.ROUTES.API_OK);
});

routes.use(productRoutes);

export default routes;