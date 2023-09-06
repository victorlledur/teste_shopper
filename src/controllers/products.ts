import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/index";
import Decimal from 'decimal.js';

const productController = {

    async listProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const listProducts = await prisma.products.findMany();
            console.log(listProducts);
            (BigInt.prototype as any).toJSON = function () {
                return Number(this)
            };
            res.status(200).json(listProducts)
        } catch (error) {
            next(error);
        }
    },

    async byIdProduct(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json("Código de produto inválido");
                return;
            }
            const parsedCode = BigInt(id);

            (BigInt.prototype as any).toJSON = function () {
                return Number(this)
            };

            const product = await prisma.products.findUnique({
                where: {
                    code: parsedCode,
                }
            });

            res.status(200).json(product)

        } catch (error) {
            next(error);
        }
    },

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id }: any = req.params;

            if (!id || isNaN(Number(id))) {
                res.status(400).json("Código de produto inválido");
                return;
            }
            const parsedCode = BigInt(id);

            (BigInt.prototype as any).toJSON = function () {
                return Number(this)
            };

            const { cost_price, sales_price } = req.body;

            const product: any = await prisma.products.findUnique({
                where: {
                    code: parsedCode,
                }
            });

            if (sales_price < cost_price || sales_price > product.sales_price * 1.1 || sales_price < product.sales_price * 0.9) {
                res.status(400).json("mudança de preço não suportada!")
            };

            const gapPrice: any = sales_price - product.sales_price

            const update = await prisma.products.update({
                where: {
                    code: parsedCode,
                },
                data: {
                    sales_price,
                }
            });

            const pack: any = await prisma.packs.findMany({
                where: {
                    product_id: parsedCode,
                },
                include: {
                    products: {
                        select: {
                            code: true,
                            sales_price: true
                        }
                    }
                }
            });

            if (!pack) {
                res.status(200).json("Processo terminado com sucesso")
            }

            if (!pack[0] || pack[0].pack_id === null || pack[0].pack_id === undefined) {
                res.status(400).json("Produto inválido");
                return;
            }

            const packId = pack[0].pack_id;

            const parsedPackId = BigInt(packId);

            let calculatedSalesPrice: Decimal = new Decimal(0);
            const qty = pack[0]?.qty;
            if (qty !== undefined) {
                const qtyDecimal = Number(qty);

                if (gapPrice < 0) {
                    calculatedSalesPrice = calculatedSalesPrice.add(sales_price * qtyDecimal);
                  } else {
                    calculatedSalesPrice = qtyDecimal * (sales_price + gapPrice.toFixed()) as any;
                    calculatedSalesPrice as Decimal
                  }

            }

            const updatePack = await prisma.products.updateMany({
                where: {
                    code: parsedPackId
                },
                data: {
                    sales_price: new Decimal(calculatedSalesPrice)
                }
            })

            res.status(200).json({ result: update, updatePack })

        } catch (error) {
            next(error);
        }
    },
}

export default productController