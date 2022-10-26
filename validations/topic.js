const Joi = require('joi');

exports.topicValidation = (data) => {
    const schema = Joi.object({
        author_id: Joi.string().required().alphanum().length(24),
        topic_title: Joi.string().required().trim(),
        topic_text: Joi.string().required().trim(),
        is_checked: Joi.boolean().default(false),
        is_approwed: Joi.boolean().default(false),
        expert_id: Joi.string().alphanum()
    })
    return schema.validate(data)
}