const Joi = require('joi');

exports.desc_topicValidation = data => {
    const schema = Joi.object({
        topic_id: Joi.string().alphanum().required(),
        desc_id: Joi.string().alphanum().required(),
    })
    return schema.validate(data)
}