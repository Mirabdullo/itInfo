const Joi = require('joi');

const descQaSchema = Joi.object({
    qa_id: Joi.string().alphanum().required(),
    desc_id: Joi.string().alphanum().required()
})

module.exports = descQaSchema