const {Schema,model} = require("mongoose")

const question_answerSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    is_checked: {
        type: Boolean,
        required: true
    },
    expert_id: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
},{versionKey: false, timestamps: true})

module.exports = model("Question_Answer",question_answerSchema)