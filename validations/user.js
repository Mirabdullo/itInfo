const Joi = require('joi');



exports.userValidation = data => {
    const schema = Joi.object({
        user_name: Joi.string().pattern(new RegExp('^[a-zA-Z]{1,50}$'))
            .required(),
        user_email: Joi.string().email().required(),
        user_password: Joi.string().required().min(6),
        user_info: Joi.string().required(),
        user_photo: Joi.string().default("/author/default.png").required(),
    })
    return schema.validate(data)
}
