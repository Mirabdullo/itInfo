const Joi = require('joi');


exports.synonymValidation = data => {
    const schema = Joi.object({
        desc_id: Joi.string().alphanum().length(24).required(),
        dict_id: Joi.string().alphanum().length(24).required()
    })
    return schema.validate(data)
}