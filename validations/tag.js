const Joi = require('joi');

exports.tagValidation = data => {
    const schema = Joi.object({
        topic_id: Joi.string().alphanum().length(24).required(),
        category_id: Joi.string().alphanum().length(24).required(),
    })
    return schema.validate(data)
}