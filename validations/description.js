const Joi = require('joi');

const descriptionSchema = Joi.object({
    dict_id: Joi.string().alphanum().required().trim(),
    category_id: Joi.string().alphanum().required().trim(),
    description: Joi.string().alphanum().required().trim(),
})

module.exports = descriptionSchema