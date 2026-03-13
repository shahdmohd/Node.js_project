import Joi from "joi";


export const userSignupSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(10)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must not exceed 10 characters"
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please provide a valid email",
            "string.empty": "Email is required"
        }),
    
    password: Joi.string()
        .min(6)
        .required()
        .pattern(/[a-z]/)
        .pattern(/[A-Z]/)
        .pattern(/[0-9]/)
        .messages({
            "string.pattern.base": "Password must contain uppercase, lowercase, and numbers",
            "string.min": "Password must be at least 6 characters",
            "string.empty": "Password is required"
        }),
    
    phone: Joi.string()
        .pattern(/^[0-9\-\+\s\(\)]{7,}$/)
        .optional()
        .messages({
            "string.pattern.base": "Please provide a valid phone number"
        }),
    
    address: Joi.string()
        .min(5)
        .optional()
        .messages({
            "string.min": "Address must be at least 5 characters"
        }),

    role: Joi.string()
    .valid("customer", "admin","seller")  
    .optional()
    .messages({
        "any.only": "Role must be either 'customer' or 'admin' or 'seller'"
    })
   

});


export const userUpdateSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(10)
        .optional()
        .messages({
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must not exceed 10 characters"
        }),
    
    phone: Joi.string()
        .pattern(/^[0-9\-\+\s\(\)]{7,}$/)
        .optional()
        .messages({
            "string.pattern.base": "Please provide a valid phone number"
        }),
    
    address: Joi.string()
        .min(5)
        .optional()
        .messages({
            "string.min": "Address must be at least 5 characters"
        }),
        
});


export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            "string.empty": "Current password is required"
        }),
    
    newPassword: Joi.string()
        .min(6)
        .required()
        .pattern(/[a-z]/)
        .pattern(/[A-Z]/)
        .pattern(/[0-9]/)
        .messages({
            "string.pattern.base": "New password must contain uppercase, lowercase, and numbers",
            "string.min": "New password must be at least 6 characters",
            "string.empty": "New password is required"
        })
});