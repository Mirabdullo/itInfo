const Joi = require('joi');

exports.author_socialValidation = (data) => {
    const schema = Joi.object({
        author_id: Joi.string().alphanum().required(),
        social_id: Joi.string().alphanum().required(),
        social_link: Joi.string().trim().required()
    })
    return schema.validate(data)
}