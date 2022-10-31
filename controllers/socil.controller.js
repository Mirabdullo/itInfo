const Social = require("../models/Social")
const {checkId} = require("../helper/helper")
const { socialValidation } = require("../validations/social")
const ApiError = require("../error/ApiError");

const addSocial = async (req,res) => {
    try {
        const {error} = socialValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {social_name,social_icon_file} = req.body
        if(social_name === '' || social_icon_file === ''){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting"})
        }

        if(await Social.findOne({social_name: {$regex: social_name, $options: "i"}})){
            return res.error(400,{friendlyMsg: "Bazada bunday ma'lumot bor"})
        }

        await Social({social_name,social_icon_file}).save()
        res.ok(200,{message: "Social added!"})

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const getSocial = async (req,res) =>{
    try {
        const social = await Social.find({})
        res.ok(200,social)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const getSocialById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const social = await Social.findById(id)
        res.ok(200,social)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const updateSocial = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const {social_name,social_icon_file} = req.body
        const old_social = await Social.findById(id)

        if(await Social.findOne({social_name: {$regex: social_name, $options: "i"}})){
            return res.error(400,{friendlyMsg: "Bazada bunday ma'lumot bor"})
        }

        await Social.findByIdAndUpdate(id,{
            social_name: social_name || old_social.social_name,
            social_icon_file: social_icon_file || old_social.social_icon_file
        })
        res.ok(200,{message: "Ma'lumot yangilandi"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const deleteSocial = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        await Social.findByIdAndDelete(id)
        res.ok(200,{message: "Ma'lumot o'chirildi"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


module.exports = {
    addSocial,
    getSocial,
    getSocialById,
    updateSocial,
    deleteSocial
}