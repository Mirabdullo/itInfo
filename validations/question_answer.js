const { boolean } = require('joi');
const Joi = require('joi');

exports.question_answerValidation = data => {
    const schema = Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
        is_checked: Joi.boolean().required(),
        expert_id: Joi.string().alphanum().required().length(24)
    })
    return schema.validate(data)
}