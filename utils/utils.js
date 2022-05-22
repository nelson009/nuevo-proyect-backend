const apiSuccessResponse = (data, statusCode = 200) => {
    return {
        error: false,
        statusCode,
        data
    }
};

const apiFailedResponse = (error, statusCode = 500) => {
    return {
        error: true,
        statusCode,
        error_details: error,
    }
};

module.exports = {
    apiSuccessResponse,
    apiFailedResponse
};