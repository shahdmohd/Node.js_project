import Joi from "joi";

export const addReviewSchema = Joi.object({
    productId: Joi.string()
        .required()
        .length(24)
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.empty": "Product ID is required",
            "string.length": "Invalid product ID format",
            "string.pattern.base": "Invalid MongoDB ID format"
        }),

    rating: Joi.number()
        .required()
        .min(1)
        .max(5)
        .messages({
            "number.base": "Rating must be a number",
            "number.min": "Rating must be at least 1",
            "number.max": "Rating must be at most 5",
            "any.required": "Rating is required"
        }),

    comment: Joi.string()
        .max(500)
        .optional()
        .messages({
            "string.max": "Comment must not exceed 500 characters"
        })
});

export const updateReviewSchema = Joi.object({
    rating: Joi.number()
        .min(1)
        .max(5)
        .optional()
        .messages({
            "number.base": "Rating must be a number",
            "number.min": "Rating must be at least 1",
            "number.max": "Rating must be at most 5"
        }),

    comment: Joi.string()
        .max(500)
        .optional()
        .messages({
            "string.max": "Comment must not exceed 500 characters"
        }),

    productId: Joi.forbidden().messages({
        "any.unknown": "Product ID cannot be updated"
    })
}).or("rating", "comment").messages({
    "object.missing": "At least one of rating or comment is required"
});

export const reviewIdParamSchema = Joi.object({
    reviewId: Joi.string()
        .required()
        .length(24)
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.empty": "Review ID is required",
            "string.length": "Invalid review ID format",
            "string.pattern.base": "Invalid MongoDB ID format"
        })
});
