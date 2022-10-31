const {Schema, model} = require("mongoose")

const adminSchema = new Schema({
    admin_name:{
        type: String,
        required:true,
        trim: true,
    },
    admin_email: {
        type:String,
        lowercase:true,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Iltimos, to'g'ri email kiriting",
        ]
    },
    admin_password: {
        type: String,
        required: true,
    },
    admin_is_active: {
        type: Boolean,
        default: false,
    },
    admin_is_creator: {
        type: Boolean,
        default: false
    },
    admin_token: {
        type: String,
    }
},{versionKey: false, timestamps: true})

module.exports = model('Admin',adminSchema)