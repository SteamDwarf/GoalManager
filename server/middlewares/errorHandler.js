const errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode && response.statusCode !== 200 ? response.statusCode : 500;

    console.error(error)

    response.status(statusCode);
    response.json({
        status: statusCode,
        message: error.message
    });
}

module.exports = errorHandler;