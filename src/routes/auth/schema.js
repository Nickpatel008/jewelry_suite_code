const Joi = require('joi');
exports.jois = {
    registrationPayload: Joi.object().keys({
        profile: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        contact: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
    }),

    loginPayload: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
}
