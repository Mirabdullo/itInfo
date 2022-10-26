const Joi = require('joi');

exports.desc_qaValidation = data =>{
    const schema = Joi.object({
        qa_id: Joi.string().alphanum().required(),
        desc_id: Joi.string().alphanum().required()
    })
    return schema.validate(data)
}