const { default: mongoose } = require("mongoose")
const Description = require("../models/Description")
const Category = require("../models/Category")
const Dictionary = require("../models/Dictionary")
const { checkId } = require("../helper/helper")
const { descriptionValidation } = require("../validations/description")

const errorHendler = (res,error) =>{
    res.status(400).send({messaga: error.messaga})
}

const addDescription = async (req,res) => {
    try {
        const {error} = descriptionValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {category_id,description} = req.body
        
        if(category_id === '' || description === ''){
            return res.status(400).send({messaga: "Ma'lumotlarni to'liq kiriting!"})
        }
        
        if(!mongoose.isValidObjectId(category_id)){
            return res.status(400).send({messaga: "Id noto'g'ri kiritilgan"})
        }        
        if(!(await Category.findOne({_id:category_id}))){
            return res.status(400).send({messaga: "Ro'yxatda bu idga tegishli ma'lumotlar topilmadi"})
        }

        if(await Description.find({category_id})){
            return res.status(400).send({messaga: "Ro'yxatda bunday ma'lumot bor"})
        }
        
        console.log("2")
        await Description({category_id,description}).save()
        res.status(200).send({messaga: "Added description!"})

    } catch (error) {
        errorHendler(res,error)
    }
}


const getDescriptions = async (req,res) =>{
    try {
        const descriptions = await Description.find({})
        res.status(200).send(descriptions)
    } catch (error) {
        errorHendler(res,error)
    }
}

const getDescriptionById = async (req,res) =>{
    try {
        const description = await Description.findById(req.params.id)
        res.status(200).send(description)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateDescriptionById = async (req,res) =>{
    try {
        const id  = req.params.id
        checkId(id)
        const {description} = req.body
        const {category_id} = await Description.find({_id:id})

        await Description.findByIdAndUpdate(id ,{category_id,description},{new:true})
        res.status(200).send({messaga: "Ma'lumotlar yangilandi"})
    } catch (error) {
        errorHendler(res,error)
    }
}


const deleteDescriptionById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Description.findByIdAndDelete(id)
        res.status(200).send({messaga: "Ma'lumot o'chirildi"})
    } catch (error) {
        errorHendler(res,error)
    }
}



module.exports = {
    addDescription,
    getDescriptionById,
    getDescriptions,
    updateDescriptionById,
    deleteDescriptionById
}
