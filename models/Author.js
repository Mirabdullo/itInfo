const {Schema,model} = require("mongoose")

const authorSchema = new Schema({
    author_first_name: {
        type:String,
        required: true,
        trim: true,
    },
    author_last_name: {
        type:String,
        required: true,
        trim: true,
    },
    author_nick_name: {
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    author_email: {
        type: String,
        required: [true, "emailni kiririting"], 
        unique: [true, "Bunday email mavjud"], 
        lowercase: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Iltimos, to'g'ri email kiriting",
        ]
    },
    author_phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2} \d{3} \d{2} \d{2}/.test(v)
            },
            message: (props) => 
                `${props.value} - telefon raqami mos emas.(namuna: 99 321 12 12)`
        },
        required: [true,"Telefon raqamni kiriting"],
        unique: [true, "Bunday phone number mavjud"], 
        maxlength:12,
        index:true
    },
    author_passwor: {
        type: String, 
        required: true,
        min: 6,
        max: 20
    },
    author_info: {
        type: String,
        required: true
    },
    author_position:{
        type:String,
        required: true
    },
    author_photo: {
        type: String,
        required: true
    },
    is_expert: {
        type: Boolean
    }
},
{versionKey:false, timestamps: true})

module.exports = model("Author",authorSchema)