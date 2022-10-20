const errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode && response.statusCode !== 200 ? response.statusCode : 500;

    response.status(statusCode);
    response.json({
        status: statusCode,
        message: error.message
    });
}

module.exports = errorHandler;