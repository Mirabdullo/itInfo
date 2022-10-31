const Category = require("../models/Category")
const {categoryValidation} = require('../validations/category');
const ApiError = require("../error/ApiError");


const addCategory = async (req,res) =>{
    try {
        const {error} = categoryValidation(req.body)
        if(error){
            console.log(error);
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {category_name} = req.body
        if(!category_name){
            res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})
        }
 
        if(await Category.findOne({category_name: {$regex: category_name, $options: "i"}})){
            return res.error(400,{friendlyMsg: `${category_name} kategoriyasi bazada bor`})
        }

        const newCategory = await Category({category_name}).save()
        res.ok(200,{message: "New category added!"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const getCategorys = async (req,res) =>{
    try {
        const categorys = await Category.find({})
        res.ok(200,categorys)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const getCategory = async (req,res) =>{
    try {
        const category = await Category(req.params.id)
        res.ok(200,category)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const updateCategory = async (req,res) =>{
    try {
        const old_cat = Category.findById(req.params.id)
        const {category_name} = req.body
        if(await Category.findOne({category_name})){
            return res.error(400,{friendlyMsg: `Bazada ${category_name}ga tegishli ma'lumotlar bor`})
        }

        await Category.findByIdAndUpdate(req.params.id,{category_name: category_name || old_cat.category_name})
        res.ok(200,{message: "Ma'lumotlar yangilandi"})

    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const deleteCategory = async (req,res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.ok(200,{message:"Ma'lumot o'chirildi"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}


module.exports = {
    addCategory,
    getCategory,
    getCategorys,
    updateCategory,
    deleteCategory
}