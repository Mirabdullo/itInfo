const Topic = require('../models/Topic');
const { checkId } = require('../helper/helper');
const Author = require('../models/Author');
const { topicValidation } = require('../validations/topic');
const ApiError = require("../error/ApiError");

const addTopic = async (req,res) => {
    try {
        const {error} = topicValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {author_id,topic_title,topic_text,is_checked,is_approwed,expert_id} = req.body

        if(!author_id || !topic_title || !topic_text || !is_checked || !is_approwed || !expert_id){
            return res.error(400,{friendlyMsg: "Ma'limotlar to'liq kiritilmagan"})
        }
        const author = await Author.findById(author_id)
        if(!author){
            return res.error(400,{friendlyMsg: "Author topilmadi"})
        }
        const expert = await Author.findById(expert_id)
        if(!expert.is_expert){
            return res.error(400,{friendlyMsg: "Expert topilmadi"})
        }

        console.log(Topic);
        const newTopic = await Topic({author_id,topic_title,topic_text,is_checked,is_approwed,expert_id})
        newTopic.save()
        res.ok(200,{message: "Topic added!"})

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const getTopic = async (req,res) => {
    try {
        const topics = await Topic.find({})
        res.ok(200,topics)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const updateTopicById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const new_topic = req.body
        if(new_topic.author_id && !(await Author.findById(new_topic.author_id))){
            return res.error(400,{friendlyMsg: 'Author id topilmadi'})
        }
        const expert = await Author.findById(id)
        if(new_topic.expert_id && !expert.is_expert){
            return res.error(400,{friendlyMsg: "Expert topilmadi"})
        }
        const old_topic = await Topic.findById(id)
        if(!old_topic) return res.error(400,{friendlyMsg: "Bu idga tegishli ma'lumot topilmadi"})

        await Topic.findByIdAndUpdate(id,{
            author_id: new_topic.author_id || old_topic.author_id,
            topic_title: new_topic.topic_title || old_topic.topic_title,
            topic_text: new_topic.topic_text || old_topic.topic_text,
            is_checked: new_topic.is_checked || old_topic.is_checked,
            is_approwed: new_topic.is_approwed || old_topic.is_approwed,
            expert_id: new_topic.expert_id || old_topic.expert_id
        })
        res.ok(200,{message: "Topic updated"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const deleteTopic = async (req,res) => {
    try {
        checkId(req.params.id)
        if(!(await Topic.findById(req.params.id))){
            return res.error(400,{friendlyMsg: "Topicda bunday ma'lumot topilmadi!"})
        }
        await Topic.findByIdAndDelete(req.params.id)
        res.ok(200,{message: "Topic deleted!"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

module.exports = {
    addTopic,
    getTopic,
    updateTopicById,
    deleteTopic
}


