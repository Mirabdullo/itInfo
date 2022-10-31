const Joi = require('joi');



const authorSchema = Joi.object({
    author_first_name: Joi.string().pattern(new RegExp('^[a-zA-Z]{1,50}$'))
        .required(),
    author_last_name: Joi.string().pattern(new RegExp('^[a-zA-Z]{1,50}$'))
        .required(),
    author_nick_name: Joi.string()
        .required(),
    author_email: Joi.string().email().required(),
    author_phone: Joi.string().required().pattern(/\d{2} \d{3} \d{2} \d{2}/),
    author_passwor: Joi.string().required().min(6).max(30),
    author_info: Joi.string().required(),
    author_position: Joi.string().required(),
    author_photo: Joi.string().default("/author/default.png").required(),
    is_expert: Joi.boolean().default(false)       
})

module.exports = authorSchema