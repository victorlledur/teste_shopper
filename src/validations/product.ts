import {validate, Joi} from 'express-validation';

export default validate({
    body: Joi.object({        
        sales_price: Joi.required()
    })
})