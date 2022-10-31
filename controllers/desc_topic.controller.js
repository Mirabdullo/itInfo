const { checkId } = require("../helper/helper")
const Description = require("../models/Description")
const Desc_Topic = require("../models/Desc_Topic")
const Topic = require("../models/Topic")
const {desc_topicValidation} = require("../validations/desc_topic")
const ApiError = require("../error/ApiError");
const addDesc_Topic = async (req,res) => {
    try {
        const {error} = desc_topicValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {topic_id,desc_id} = req.body
        if(!topic_id || !desc_id) return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})

        checkId(topic_id)
        checkId(desc_id)
        if(!(await Topic.findById(topic_id))){
            return res.error(400,{friendlyMsg: "Bu idga tegisshli ma'lumot topilmadi!"})
        }        

        if(!(await Description.findById(desc_id))){
            return res.error(400,{friendlyMsg: "Bu idga tegisshli ma'lumot topilmadi!"})
        }

        const newDesc_Topic = await Desc_Topic({topic_id,desc_id})
        newDesc_Topic.save()
        res.ok(200,{message: "New Desc_Topic added",newDesc_Topic}) 

    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const getDesc_Topic = async (req,res) => {
    try {
        const desc_topics = await Desc_Topic.find({})
        res.ok(200,desc_topics)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const updateDesc_TopicById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const old_desc_topic = await Desc_Topic.findById(id)
        if(!old_desc_topic) return res.error(400,{friendlyMsg: "Bu idga tegishli ma'lumot topilmadi"})

        const new_desc_topic = req.body
        if(new_desc_topic.topic_id && (!checkId(new_desc_topic.topic_id) || !(await Topic.findById(new_desc_topic.topic_id)))){
            return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})
        }
        if(new_desc_topic.desc_id && (!checkId(new_desc_topic.desc_id) || !(await Category.findById(new_desc_topic.desc_id)))){
            return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})
        }

        await Desc_Topic.findByIdAndUpdate(id,{
            topic_id: new_desc_topic.topic_id || old_desc_topic.topic_id,
            desc_id: new_desc_topic.desc_id || old_desc_topic.desc_id
        })
        res.ok(200,{message: "Updated!"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const deleteDesc_TopicById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Desc_Topic.findByIdAndDelete(id)
        res.ok(200,"Deleted!")
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}


module.exports = {
    addDesc_Topic,
    getDesc_Topic, 
    updateDesc_TopicById,
    deleteDesc_TopicById
}