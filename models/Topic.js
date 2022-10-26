const { Schema, model } = require("mongoose")

const topicSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    topic_title: {
        type: String,
        required: true,
        trim:true,
        uppercase:true 
    },
    topic_text: {
        type: String,
        required: true,
        trim:true,
    },
    is_checked: {
        type: Boolean,
        required: true
    },
    is_approwed: {
        type: Boolean,
        required:true,
    },
    expert_id: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    }
},
{versionKey: false, timestamps: true})


module.exports = model("Topic",topicSchema)