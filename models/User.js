const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    user_name:{
        type: String,
        required:true,
        trim: true,
    },
    user_email: {
        type:String,
        lowercase:true,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Iltimos, to'g'ri email kiriting",
        ]
    },
    user_password: {
        type: String,
        required: true,
    },
    user_info: {
        type: String,
        required:true
    },
    user_photo: {
        type: String,
        required: true
    }
},{versionKey: false, timestamps: true})

module.exports = model('User',userSchema)