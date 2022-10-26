const Topic = require('../models/Topic');
const { errorHendler, checkId } = require('../helper/helper');
const Author = require('../models/Author');
const { topicValidation } = require('../validations/topic');


const addTopic = async (req,res) => {
    try {
        const {error} = topicValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {author_id,topic_title,topic_text,is_checked,is_approwed,expert_id} = req.body

        if(!author_id || !topic_title || !topic_text || !is_checked || !is_approwed || !expert_id){
            return res.status(400).send({message: "Ma'limotlar to'liq kiritilmagan"})
        }
        const author = await Author.findById(author_id)
        if(!author){
            return res.status(400).send({message: "Author topilmadi"})
        }
        const expert = await Author.findById(expert_id)
        if(!expert.is_expert){
            return res.status(400).send({message: "Expert topilmadi"})
        }

        console.log(Topic);
        const newTopic = await Topic({author_id,topic_title,topic_text,is_checked,is_approwed,expert_id})
        newTopic.save()
        res.status(200).send({message: "Topic added!"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const getTopic = async (req,res) => {
    try {
        const topics = await Topic.find({})
        res.status(200).send(topics)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateTopicById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const new_topic = req.body
        if(new_topic.author_id && !(await Author.findById(new_topic.author_id))){
            return res.status(400).send({message: 'Author id topilmadi'})
        }
        const expert = await Author.findById(expert_id)
        if(new_topic.expert_id && !expert.is_expert){
            return res.status(400).send({message: "Expert topilmadi"})
        }
        const old_topic = await Topic.findById(id)
        if(!old_topic) return res.status(400).send({message: "Bu idga tegishli ma'lumot topilmadi"})

        await Topic.findByIdAndUpdate(id,{
            author_id: new_topic.author_id || old_topic.author_id,
            topic_title: new_topic.topic_title || old_topic.topic_title,
            topic_text: new_topic.topic_text || old_topic.topic_text,
            is_checked: new_topic.is_checked || old_topic.is_checked,
            is_approwed: new_topic.is_approwed || old_topic.is_approwed,
            expert_id: new_topic.expert_id || old_topic.expert_id
        })
        res.status(200).send({message: "Topic updated"})
    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteTopic = async (req,res) => {
    try {
        checkId(req.params.id)
        if(!(await Topic.findById(req.params.id))){
            return res.status(400).send({message: "Topicda bunday ma'lumot topilmadi!"})
        }
        await Topic.findByIdAndDelete(req.params.id)
        res.status(200).send({message: "Topic deleted!"})
    } catch (error) {
        errorHendler(res,error)
    }
}

module.exports = {
    addTopic,
    getTopic,
    updateTopicById,
    deleteTopic
}


