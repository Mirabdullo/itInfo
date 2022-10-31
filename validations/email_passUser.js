const joi = require('joi');

const emailPassSchema = joi.object({
    user_email: joi.string().email().required(),
    user_password: joi.string().min(5).required()
})

module.exports = emailPassSchema