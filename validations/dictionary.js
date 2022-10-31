const joi = require('joi');

const dictionarySchema = joi.object({
    term: joi.string().trim().required(),
    letter: joi.string().uppercase()
})

module.exports = dictionarySchema