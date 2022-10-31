const Joi = require('joi');

const tagSchema = Joi.object({
    topic_id: Joi.string().alphanum().length(24).required(),
    category_id: Joi.string().alphanum().length(24).required(),
})

module.exports = tagSchema