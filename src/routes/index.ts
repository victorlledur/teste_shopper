import { Request, Response, Router } from "express";
import productRoutes from "./products"


const routes = Router();

routes.get("/", (req:Request, res:Response) =>{
    return res.json("API Funcionando");
});

routes.use(productRoutes);

export default routes;