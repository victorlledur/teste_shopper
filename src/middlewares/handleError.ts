import { Response, Request } from 'express';
import { NextFunction } from 'express-serve-static-core';

import { ValidationError } from "express-validation";


export default (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ValidationError){
        return res.status(error.statusCode).json(error);
    }
    
    return res.status(500).json(error);
}