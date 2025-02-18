const { AuthFailureResponse } = require('../core/index');

// Middleware to check jewelry read/write permissions
module.exports = function permissionCheck(req, res, next) {
    try {
        let permissionType;

        switch (req.method) {
            case "GET":
                permissionType = "jewelry_read";
                break;
            case "POST":
            case "PUT":
            case "PATCH":
            case "DELETE":
                permissionType = "jewelry_write";
                break;
            default:
                return res.status(405).send({
                    status_code: 405,
                    message: "Method not allowed.",
                });
        }

        if (!req.user || !req.user.js_admin_permission) {
            return res.status(403).send({
                status_code: 403,
                message: "Forbidden: You do not have the required permissions.",
            });
        }
        // Check the permission
        if (permissionType === "jewelry_read" && req.user.js_admin_permission.jewelry_read) {
            return next();
        } else if (permissionType === "jewelry_write" && req.user.js_admin_permission.jewelry_write) {
            return next();
        } else {
            return res.status(403).send({
                status_code: 403,
                message: "Forbidden: You do not have the required permissions.",
            });
        }
    } catch (err) {
        new AuthFailureResponse(err.message).send(res);
    }
};
