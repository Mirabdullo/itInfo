const Joi = require('joi');

exports.mediaValidation = data => {
    const schema = Joi.object({
        media_name: Joi.string().required(),
        media_file: Joi.string().required(),
        target_table_name: Joi.string().required(),
        target_table_id: Joi.string().alphanum().required()
    })
    return schema.validate(data)
}