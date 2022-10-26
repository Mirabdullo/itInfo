const {Schema,model} = require("mongoose")

const desc_qaSchema = new Schema({
    qa_id: {
        type: Schema.Types.ObjectId,
        ref: "Question_Answer",
        required: true
    },
    desc_id: {
        type: Schema.Types.ObjectId,
        ref: "Description",
        required: true,
    },
},{versionKey: false, timestamps: true})


module.exports = model("Desc_QA",desc_qaSchema)