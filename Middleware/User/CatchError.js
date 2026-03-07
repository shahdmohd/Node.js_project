const globalError = (err, req, res, next) => {

    const statusCode = err.statusCode || 500
     res.status(statusCode).json({
        status: "error",
        source: "globalErrorMiddleware",  
        message: err.message || "Internal Server Error"
    })
}

export default globalError