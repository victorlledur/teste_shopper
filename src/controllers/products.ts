import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/index";

const productController = {
   
    async listProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const listProducts = await prisma.products.findMany();
            res.status(200).json(listProducts);
        } catch (error) {
            next(error);
        }
    },

    async byIdProduct(req: Request, res: Response, next: NextFunction) {
        try {

            const { code } = req.params;
            code as unknown

            const product = await prisma.products.findUnique({
                where: {
                    code,
                }
            });

            if (!product) {
                res.status(404).json("Não encontrado");
            };

            res.status(200).json(product)

        } catch (error) {
            next(error);
        }
    },

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.params;
            const { name, cost_price, sales_price} = req.body;

            const product = await prisma.products.findUnique({
                where: {
                code,
                }
            });

            if (!product) {
                res.status(400).json("não encontrado");
            };

            const update = await prisma.products.update({
                where: {
                    code,
                },
                data: {
                    name,
                    cost_price,
                    sales_price,                    
                }
            });

            res.status(200).json({ result: update })
        } catch (error) {
            next(error);
        }
    },
}

    

export default productController