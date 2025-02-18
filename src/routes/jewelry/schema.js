const Joi = require('joi');

exports.jois = {
    addJewelryPayload: Joi.object().keys({
        jewelry_type_sub_id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().optional(null, ''),
        weight: Joi.number().positive().required(),
        metal_id: Joi.string().required(),
        images: Joi.array().items(Joi.string().uri()).required(),
        natural_price: Joi.number().positive().required(),
        lab_price: Joi.number().positive().required(),
    })
};