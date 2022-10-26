const { required } = require('joi');
const joi = require('joi');

exports.dictionaryValidation = data => {
    const schema = joi.object({
        term: joi.string().trim().required(),
        letter: joi.string().uppercase()
    })
    return schema.validate(data)
}