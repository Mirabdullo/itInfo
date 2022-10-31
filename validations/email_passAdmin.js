const joi = require('joi');

const emailPassSchema = joi.object({
    admin_email: joi.string().email().required(),
    admin_password: joi.string().min(5).required()
})

module.exports = emailPassSchema