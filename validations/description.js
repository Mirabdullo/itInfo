const Joi = require('joi');

exports.descriptionValidation = data => {
    const schema = Joi.object({
        dict_id: Joi.string().alphanum().required().trim(),
        category_id: Joi.string().alphanum().required().trim(),
        description: Joi.string().alphanum().required().trim(),
    })
    return schema.validate(data)
}