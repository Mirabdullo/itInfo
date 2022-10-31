const Joi = require('joi');

const socialSchema = Joi.object({
    social_name: Joi.string().trim().required(),
    social_icon_file: Joi.string().trim().required()
})

module.exports = socialSchema