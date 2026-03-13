
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            return res.status(422).json({ 
                message: validation.error.details[0].message 
            });
        }
        next();
    };
};

export const paramsValidationMiddleware = (schema) => {
    return (req, res, next) => {
        const validation = schema.validate(req.params);
        if (validation.error) {
            return res.status(422).json({ 
                message: validation.error.details[0].message 
            });
        }
        next();
    };
};

export default validationMiddleware;