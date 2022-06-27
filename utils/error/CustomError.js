class CustomError {
    constructor(statusCode, description, details) {
        this.status = statusCode;
        this.message = description;
        this.details = details;
    }
};

module.exports = CustomError;