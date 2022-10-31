const { checkId } = require("../helper/helper")
const Description = require("../models/Description")
const Desc_QA = require("../models/Desc_QA")
const Question_Answer = require("../models/Question_Answer")
const { desc_qaValidation } = require("../validations/desc_qa")
const ApiError = require("../error/ApiError");

const addDesc_QA = async (req,res) => {
    try {
        const {error} = desc_qaValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {qa_id,desc_id} = req.body
        if(!qa_id || !desc_id) return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})

        checkId(qa_id)
        checkId(desc_id)
        if(!(await Question_Answer.findById(qa_id))){
            return res.error(400,{friendlyMsg: "Bu idga tegisshli ma'lumot topilmadi!"})
        }        

        if(!(await Description.findById(desc_id))){
            return res.error(400,{friendlyMsg: "Bu idga tegisshli ma'lumot topilmadi!"})
        }

        const newDesc_QA = await Desc_QA({qa_id,desc_id})
        newDesc_QA.save()
        res.ok(200,{message: "New Desc_QA added",newDesc_QA}) 

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const getDesc_QA = async (req,res) => {
    try {
        const Desc_QAs = await Desc_QA.find({})
        res.ok(200,Desc_QAs)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const updateDesc_QAById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const old_Desc_QA = await Desc_QA.findById(id)
        if(!old_Desc_QA) return res.error(400,{friendlyMsg: "Bu idga tegishli ma'lumot topilmadi"})

        const new_Desc_QA = req.body
        if(new_Desc_QA.qa_id && (!checkId(new_Desc_QA.qa_id) || !(await Question_Answer.findById(new_Desc_QA.qa_id)))){
            return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})
        }
        if(new_Desc_QA.desc_id && (!checkId(new_Desc_QA.desc_id) || !(await Description.findById(new_Desc_QA.desc_id)))){
            return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})
        }

        await Desc_QA.findByIdAndUpdate(id,{
            qa_id: new_Desc_QA.qa_id || old_Desc_QA.qa_id,
            desc_id: new_Desc_QA.desc_id || old_Desc_QA.desc_id
        })
        res.ok(200,{message: "Updated!"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const deleteDesc_QAById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Desc_QA.findByIdAndDelete(id)
        res.ok(200,"Deleted!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


module.exports = {
    addDesc_QA,
    getDesc_QA, 
    updateDesc_QAById,
    deleteDesc_QAById
}