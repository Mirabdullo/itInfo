const {Schema,model} = require("mongoose")

const desc_topicSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    },
    desc_id: {
        type: Schema.Types.ObjectId,
        ref: "Description",
        required: true,
    },
},{versionKey: false, timestamps: true})


module.exports = model("Desc_Topic",desc_topicSchema)