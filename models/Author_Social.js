const {Schema,model} = require("mongoose")

const author_socialSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    social_id: {
        type: Schema.Types.ObjectId,
        ref: "Social",
        required: true
    },
    social_link: {
        type: String,
        required: true,
        trim: true
    }
},{versionKey:false, timestamps: true})

module.exports = model("Author_Social",author_socialSchema)