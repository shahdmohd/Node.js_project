import Joi from "joi";


export const addFavoriteSchema = Joi.object({
    productId: Joi.string()
        .required()
        .length(24)
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.empty": "Product ID is required",
            "string.length": "Invalid product ID format",
            "string.pattern.base": "Invalid MongoDB ID format"
        })
});

export const removeFavoriteSchema = Joi.object({
    productId: Joi.string()
        .required()
        .length(24)
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.empty": "Product ID is required",
            "string.length": "Invalid product ID format",
            "string.pattern.base": "Invalid MongoDB ID format"
        })
});