const Social = require("../models/Social")
const {errorHendler,checkId} = require("../helper/helper")
const { socialValidation } = require("../validations/social")


const addSocial = async (req,res) => {
    try {
        const {error} = socialValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {social_name,social_icon_file} = req.body
        if(social_name === '' || social_icon_file === ''){
            return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting"})
        }

        if(await Social.findOne({social_name: {$regex: social_name, $options: "i"}})){
            return res.status(400).send({message: "Bazada bunday ma'lumot bor"})
        }

        await Social({social_name,social_icon_file}).save()
        res.status(200).send({message: "Social added!"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const getSocial = async (req,res) =>{
    try {
        const social = await Social.find({})
        res.status(200).send(social)
    } catch (error) {
        errorHendler(res,error)
    }
}

const getSocialById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const social = await Social.findById(id)
        res.status(200).send(social)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateSocial = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const {social_name,social_icon_file} = req.body
        const old_social = await Social.findById(id)

        if(await Social.findOne({social_name: {$regex: social_name, $options: "i"}})){
            return res.status(400).send({message: "Bazada bunday ma'lumot bor"})
        }

        await Social.findByIdAndUpdate(id,{
            social_name: social_name || old_social.social_name,
            social_icon_file: social_icon_file || old_social.social_icon_file
        })
        res.status(200).send({message: "Ma'lumot yangilandi"})
    } catch (error) {
        errorHendler(res,error)
    }
}


const deleteSocial = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        await Social.findByIdAndDelete(id)
        res.status(200).send({message: "Ma'lumot o'chirildi"})
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addSocial,
    getSocial,
    getSocialById,
    updateSocial,
    deleteSocial
}