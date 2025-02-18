const jwt = require('jsonwebtoken');
const { dbReader } = require('../models/dbConfig');
const { AuthFailureResponse } = require('../core/index');

module.exports = async function tokenValidate(req, res, next) {
    try {
        if (req.headers.authorization) {
            let access_token = req.headers.authorization.toString().split(" ")[1];

            jwt.verify(access_token, process.env.SECRET_KEY, async function (err, decoded) {
                if (err) {
                    // ? invalid token
                    new AuthFailureResponse("Invalid token.").send(res);
                } else {
                    // ? Check if the token exists in the database
                    let user = await dbReader.admin.findOne({
                        include: [{
                            model: dbReader.adminPermissions
                        }],
                        where: { access_token: access_token.toString() },
                    });
                    if (user) {
                        user = JSON.parse(JSON.stringify(user))
                        req.user = user
                        next();
                    } else {
                        new AuthFailureResponse("Your session is expired. Please login into the system again.").send(res);
                    }
                }
            });
        } else {
            res.status(401).send({
                status_code: 401,
                message: "Unauthorized request: no authentication given",
            });
        }
    } catch (err) {
        new AuthFailureResponse(err.message).send(res)
    }
};
