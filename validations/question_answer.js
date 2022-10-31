const Joi = require('joi');

const questionAnswerSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    is_checked: Joi.boolean().required(),
    expert_id: Joi.string().alphanum().required().length(24)
})

module.exports = questionAnswerSchema