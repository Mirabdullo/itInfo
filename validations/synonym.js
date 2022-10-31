const Joi = require('joi');

const synonymSchema = Joi.object({
    desc_id: Joi.string().alphanum().length(24).required(),
    dict_id: Joi.string().alphanum().length(24).required()
})

module.exports = synonymSchema