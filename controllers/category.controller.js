const Category = require("../models/Category")
const {categoryValidation} = require('../validations/category');



const addCategory = async (req,res) =>{
    try {
        const {error} = categoryValidation(req.body)
        if(error){
            console.log(error);
            return res.status(400).send({message: error.details[0].message})
        }
        const {category_name} = req.body
        if(!category_name){
            res.status(400).send({message: "Ma'lumotlarni to'liq kiriting!"})
        }
 
        if(await Category.findOne({category_name: {$regex: category_name, $options: "i"}})){
            return res.status(400).send({message: `${category_name} kategoriyasi bazada bor`})
        }

        const newCategory = await Category({category_name}).save()
        res.status(200).send({message: "New category added!"})
    } catch (error) {
        errorHendler(res.error)
    }
}

const getCategorys = async (req,res) =>{
    try {
        const categorys = await Category.find({})
        res.status(200).send(categorys)
    } catch (error) {
        errorHendler(res.error)
    }
}

const getCategory = async (req,res) =>{
    try {
        const category = await Category(req.params.id)
        res.status(200).send(category)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateCategory = async (req,res) =>{
    try {
        const old_cat = Category.findById(req.params.id)
        const {category_name} = req.body
        if(await Category.findOne({category_name})){
            return res.status(400).send({message: `Bazada ${category_name}ga tegishli ma'lumotlar bor`})
        }

        await Category.findByIdAndUpdate(req.params.id,{category_name: category_name || old_cat.category_name})
        res.status(200).send({message: "Ma'lumotlar yangilandi"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteCategory = async (req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).send({message:"Ma'lumot o'chirildi"})
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addCategory,
    getCategory,
    getCategorys,
    updateCategory,
    deleteCategory
}