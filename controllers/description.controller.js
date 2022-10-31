const { default: mongoose } = require("mongoose")
const Description = require("../models/Description")
const Category = require("../models/Category")
const Dictionary = require("../models/Dictionary")
const { checkId } = require("../helper/helper")
const { descriptionValidation } = require("../validations/description")
const ApiError = require("../error/ApiError");

const addDescription = async (req,res) => {
    try {
        const {error} = descriptionValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {category_id,description} = req.body
        
        if(category_id === '' || description === ''){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})
        }
        
        if(!mongoose.isValidObjectId(category_id)){
            return res.error(400,{friendlyMsg: "Id noto'g'ri kiritilgan"})
        }        
        if(!(await Category.findOne({_id:category_id}))){
            return res.error(400,{friendlyMsg: "Ro'yxatda bu idga tegishli ma'lumotlar topilmadi"})
        }

        if(await Description.find({category_id})){
            return res.error(400,{friendlyMsg: "Ro'yxatda bunday ma'lumot bor"})
        }
        
        console.log("2")
        await Description({category_id,description}).save()
        res.ok(200,{messaga: "Added description!"})

    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}


const getDescriptions = async (req,res) =>{
    try {
        const descriptions = await Description.find({})
        res.ok(200,descriptions)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const getDescriptionById = async (req,res) =>{
    try {
        const description = await Description.findById(req.params.id)
        res.ok(200,description)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const updateDescriptionById = async (req,res) =>{
    try {
        const id  = req.params.id
        checkId(id)
        const {description} = req.body
        const {category_id} = await Description.find({_id:id})

        await Description.findByIdAndUpdate(id ,{category_id,description},{new:true})
        res.ok(200,{messaga: "Ma'lumotlar yangilandi"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}


const deleteDescriptionById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Description.findByIdAndDelete(id)
        res.ok(200,{messaga: "Ma'lumot o'chirildi"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}



module.exports = {
    addDescription,
    getDescriptionById,
    getDescriptions,
    updateDescriptionById,
    deleteDescriptionById
}
