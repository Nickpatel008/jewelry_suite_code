class ApiResponse {
    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data; // Optional data field for successful responses
    }

    send(res) {
        res.status(this.status).json({
            status: this.status,
            message: this.message,
            data: this.data
        });
    }
}

class AuthFailureResponse extends ApiResponse {
    constructor(message = "Authentication Failure") {
        super(401, message);
    }
}

class InternalErrorResponse extends ApiResponse {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}

class SuccessResponse extends ApiResponse {
    constructor(message = "Success", data = null) {
        super(200, message, data);
    }
}

class BadRequestResponse extends ApiResponse {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}

class NotFoundResponse extends ApiResponse {
    constructor(message = "Not Found") {
        super(404, message);
    }
}

module.exports = {
    AuthFailureResponse,
    InternalErrorResponse,
    SuccessResponse,
    BadRequestResponse,
    NotFoundResponse,
};
