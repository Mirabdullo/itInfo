const Joi = require('joi');

const authorSocialSchema = Joi.object({
    author_id: Joi.string().alphanum().required(),
    social_id: Joi.string().alphanum().required(),
    social_link: Joi.string().trim().required()
})

module.exports = authorSocialSchema