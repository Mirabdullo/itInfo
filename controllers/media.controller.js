const { errorHendler, checkId } = require("../helper/helper")
const Description = require("../models/Description")
const Media = require("../models/Media")
const Question_Answer = require("../models/Question_Answer")
const Topic = require("../models/Topic")
const { mediaValidation } = require("../validations/media")



const addMedia = async (req,res) => {
    try {
        const {error} = mediaValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {media_name,media_file,target_table_name,target_table_id} = req.body
        if(!media_name || !media_file || !target_table_name || !target_table_id){
            return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting"})
        }

        if(target_table_name != "Question_Answer" && target_table_name != "Description" && target_table_name != "Topic"){
            return res.status(400).send({message: "Ma'lumotlarni to'g'ri kiriting"})
        }

        if(target_table_name === "Description" && !(await Description.findById(target_table_id))){
            return res.status(400).send({message: "name va id to'g'ri kelmadi"})
        }

        if(target_table_name === "Topic" && !(await Topic.findById(target_table_id))){
            return res.status(400).send({message: "name va id to'g'ri kelmadi"})
        }

        if(target_table_name === "Question_Answer" && !(await Question_Answer.findById(target_table_id))){
            return res.status(400).send({message: "name va id to'g'ri kelmadi"})
        }

        const newMedia = await Media({media_name,media_file,target_table_name,target_table_id})
        newMedia.save()
        res.status(200).send({message: "Added media"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const getMedia = async (req,res) => {
    try {
        const media = await Media.find({})
        res.status(200).send(media)
    } catch (error) {
        errorHendler(res,error)
    }
}


const updateMediaById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const old_media = await Media.findById(id)
        if(!old_media) return res.status(400).send({message: "Ma'lumotlar topilmadi"})

        const new_media = req.body

        if(new_media.target_table_name && new_media.target_table_name != "Question_Answer" || new_media.target_table_name != "Description" || new_media.target_table_name != "Topic"){
            return res.status(400).send({message: "Ma'lumotlarni to'g'ri kiriting"})
        }

        if(new_media.target_table_name === "Description" && !(await Description.findById(new_media.target_table_id || old_media.target_table_id))){
            return res.status(400).send({message: "name va id to'g'ri kelmadi"})
        }

        if(new_media.target_table_name === "Topic" && !(await Topic.findById(new_media.target_table_id || old_media.target_table_id))){
            return res.status(400).send({message: "name va id to'g'ri kelmadi"})
        }

        if(new_media.target_table_name === "Question_Answer" && !(await Question_Answer.findById(new_media.target_table_id || old_media.target_table_id))){
            return res.status(400).send({message: "name va id to'g'ri kelmadi"})
        }

        await Media.findByIdAndUpdate(id,{
            media_name: new_media.media_name || old_media.media_name,
            media_file: new_media.media_file || old_media.media_file,
            target_table_name: new_media.target_table_name || old_media.target_table_name,
            target_table_id: new_media.target_table_id || old_media.target_table_id
        })
        res.status(200).send({message: "Updated!"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteMediaById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Media.findByIdAndDelete(id)
    } catch (error) {
        errorHendler(res,error)
    }
}

module.exports = {
    addMedia,
    getMedia,
    updateMediaById,
    deleteMediaById
}