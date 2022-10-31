const { checkId } = require("../helper/helper")
const Description = require("../models/Description")
const Media = require("../models/Media")
const Question_Answer = require("../models/Question_Answer")
const Topic = require("../models/Topic")
const { mediaValidation } = require("../validations/media")
const ApiError = require("../error/ApiError");


const addMedia = async (req,res) => {
    try {
        const {error} = mediaValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {media_name,media_file,target_table_name,target_table_id} = req.body
        if(!media_name || !media_file || !target_table_name || !target_table_id){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting"})
        }

        if(target_table_name != "Question_Answer" && target_table_name != "Description" && target_table_name != "Topic"){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'g'ri kiriting"})
        }

        if(target_table_name === "Description" && !(await Description.findById(target_table_id))){
            return res.error(400,{friendlyMsg: "name va id to'g'ri kelmadi"})
        }

        if(target_table_name === "Topic" && !(await Topic.findById(target_table_id))){
            return res.error(400,{friendlyMsg: "name va id to'g'ri kelmadi"})
        }

        if(target_table_name === "Question_Answer" && !(await Question_Answer.findById(target_table_id))){
            return res.error(400,{friendlyMsg: "name va id to'g'ri kelmadi"})
        }

        const newMedia = await Media({media_name,media_file,target_table_name,target_table_id})
        newMedia.save()
        res.ok(200,{message: "Added media"})

    } catch (error) {
        res.error(400,{friendlyMsg: error})
    }
}

const getMedia = async (req,res) => {
    try {
        const media = await Media.find({})
        res.ok(200,media)
    } catch (error) {
        res.error(400,{friendlyMsg: error})
    }
}


const updateMediaById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const old_media = await Media.findById(id)
        if(!old_media) return res.error(400,{friendlyMsg: "Ma'lumotlar topilmadi"})

        const new_media = req.body

        if(new_media.target_table_name && new_media.target_table_name != "Question_Answer" || new_media.target_table_name != "Description" || new_media.target_table_name != "Topic"){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'g'ri kiriting"})
        }

        if(new_media.target_table_name === "Description" && !(await Description.findById(new_media.target_table_id || old_media.target_table_id))){
            return res.error(400,{friendlyMsg: "name va id to'g'ri kelmadi"})
        }

        if(new_media.target_table_name === "Topic" && !(await Topic.findById(new_media.target_table_id || old_media.target_table_id))){
            return res.error(400,{friendlyMsg: "name va id to'g'ri kelmadi"})
        }

        if(new_media.target_table_name === "Question_Answer" && !(await Question_Answer.findById(new_media.target_table_id || old_media.target_table_id))){
            return res.error(400,{friendlyMsg: "name va id to'g'ri kelmadi"})
        }

        await Media.findByIdAndUpdate(id,{
            media_name: new_media.media_name || old_media.media_name,
            media_file: new_media.media_file || old_media.media_file,
            target_table_name: new_media.target_table_name || old_media.target_table_name,
            target_table_id: new_media.target_table_id || old_media.target_table_id
        })
        res.ok(200,{message: "Updated!"})

    } catch (error) {
        res.error(400,{friendlyMsg: error})
    }
}

const deleteMediaById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Media.findByIdAndDelete(id)
        res.ok(200,"Deleted!")
    } catch (error) {
        res.error(400,{friendlyMsg: error})
    }
}

module.exports = {
    addMedia,
    getMedia,
    updateMediaById,
    deleteMediaById
}