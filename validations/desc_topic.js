const Joi = require('joi');

const descTopicSchema = Joi.object({
    topic_id: Joi.string().alphanum().required(),
    desc_id: Joi.string().alphanum().required(),
})

module.exports = descTopicSchema