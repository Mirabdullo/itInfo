const Joi = require('joi');



exports.adminValidation = data => {
    const schema = Joi.object({
        admin_name: Joi.string().pattern(new RegExp('^[a-zA-Z]{1,50}$'))
            .required(),
        admin_email: Joi.string().email().required(),
        admin_password: Joi.string().required().min(6),
        admin_is_active: Joi.boolean().default(false),
        admin_is_creator: Joi.boolean().default(false)       
    })
    return schema.validate(data)
}
