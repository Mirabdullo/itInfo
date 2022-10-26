const {Schema,model} = require("mongoose")

const socialSchema = new Schema({
    social_name: {
        type: String,
        required:true,
        trim:true
    },
    social_icon_file: {
        type: String,
        required: true,
        trim:true
    }
},
{versionKey:false, timestamps: true})

module.exports = model("Social",socialSchema)