const Joi = require('joi');

const mediaSchema = Joi.object({
    media_name: Joi.string().required(),
    media_file: Joi.string().required(),
    target_table_name: Joi.string().required(),
    target_table_id: Joi.string().alphanum().required()
})

module.exports = mediaSchema