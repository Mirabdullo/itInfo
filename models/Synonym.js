const {Schema,model} = require("mongoose")

const synonymSchema = new Schema({
    desc_id: {
        type: Schema.Types.ObjectId,
        ref: "Description",
        required: true,
    },
    dict_id: {
        type: Schema.Types.ObjectId,
        ref: "Dictionary",
        required: true
    }
},{versionKey: false, timestamps: true})


module.exports = model("Synonym",synonymSchema)