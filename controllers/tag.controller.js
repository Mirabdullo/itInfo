const { errorHendler, checkId } = require("../helper/helper")
const Category = require("../models/Category")
const Tag = require("../models/Tag")
const Topic = require("../models/Topic")


const addTag = async (req,res) => {
    try {
        const {error} = tagValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {topic_id,category_id} = req.body
        if(!topic_id || !category_id) return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting!"})

        checkId(topic_id)
        checkId(category_id)
        if(!(await Topic.findById(topic_id))){
            return res.status(400).send({message: "Bu idga tegisshli ma'lumot topilmadi!"})
        }        

        if(!(await Category.findById(category_id))){
            return res.status(400).send({message: "Bu idga tegisshli ma'lumot topilmadi!"})
        }

        const newTag = await Tag({topic_id,category_id})
        newTag.save()
        res.status(200).send({message: "New tag added",newTag}) 

    } catch (error) {
        errorHendler(res,error)
    }
}

const getTag = async (req,res) => {
    try {
        const tags = await Tag.find({})
        res.status(200).send(tags)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateTagById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const old_tag = await Tag.findById(id)
        if(!old_tag) return res.status(400).send({message: "Bu idga tegishli ma'lumot topilmadi"})

        const new_tag = req.body
        if(new_tag.topic_id && (!checkId(new_tag.topic_id) || !(await Topic.findById(new_tag.topic_id)))){
            return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})
        }
        if(new_tag.category_id && (!checkId(new_tag.category_id) || !(await Category.findById(new_tag.category_id)))){
            return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})
        }

        await Tag.findByIdAndUpdate(id,{
            topic_id: new_tag.topic_id || old_tag.topic_id,
            category_id: new_tag.category_id || old_tag.category_id
        })
        res.status(200).send({message: "Updated!"})
    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteTagById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Tag.findByIdAndDelete(id)
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addTag,
    getTag,
    updateTagById,
    deleteTagById
}