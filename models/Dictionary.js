const { strict } = require('assert');
const {Schema,model} = require('mongoose');

const dictionarySchema = new Schema({
    term: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    letter: {
        type:String,
        uppercase:true,
    }
},
{versionKey:false, timestamps: true})

module.exports = model("Dictionary", dictionarySchema)
