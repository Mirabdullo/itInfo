const joi = require('joi');

const emailPassSchema = joi.object({
    author_email: joi.string().email().required(),
    author_password: joi.string().min(5).required()
})

module.exports = emailPassSchema