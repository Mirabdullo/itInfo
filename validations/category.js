const Joi = require('joi');

const categorySchema = Joi.object({
    category_name: Joi.string()
        .min(2)
        .max(255)
        .required(),
    parent_category_id: Joi.string().alphanum(),
})

module.exports = categorySchema