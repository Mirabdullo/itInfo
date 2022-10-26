const {Schema, model} = require('mongoose');


const descriptionSchema = new Schema({
    dict_id: {
        type: Schema.Types.ObjectId,
        ref: "Dictionary",
        required:true,
        trim: true,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
},
{versionKey:false, timestamps: true})

module.exports = model("Description",descriptionSchema)