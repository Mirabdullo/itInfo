const Joi = require('joi');
exports.socialValidation = data => {
    const schema = Joi.object({
        social_name: Joi.string().trim().required(),
        social_icon_file: Joi.string().trim().required()
    })
    return schema.validate(data)
}
