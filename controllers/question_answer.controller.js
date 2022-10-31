const { checkId } = require("../helper/helper")
const Author = require("../models/Author")
const Question_Answer = require("../models/Question_Answer")
const { question_answerValidation } = require("../validations/question_answer")
const ApiError = require("../error/ApiError");


const addQuestion_Answer = async (req,res) => {
    try {
        const {error} = question_answerValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {question,answer,is_checked,expert_id} = req.body
        if(!question || !answer || !expert_id){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting"})
        }

        checkId(expert_id)
        if(!(await Author.findById(expert_id))){
            return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})
        }

        const newQuestion_Answer = await Question_Answer({
            question,
            answer,
            is_checked: is_checked || false,
            expert_id
        })
        newQuestion_Answer.save()
        res.ok(200,{message: "Question Answer added!"})


    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const getQuestion_Answer = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const question_answer = await Question_Answer.find({})
        res.ok(200,question_answer)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const updateQuestion_AnswerById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        
        const old_question_answer = await Question_Answer.findById(id)
        if(!old_question_answer) return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})

        const new_question_answer = req.body

        if(new_question_answer.expert_id && !(await Author.findById(new_question_answer.expert_id))){
            return res.error(400,{friendlyMsg: "idga tegishli ma'lumot topilmadi"})
        }

        await Question_Answer.findByIdAndUpdate(id,{
           question: new_question_answer.question || old_question_answer.question, 
           answer: new_question_answer.answer || old_question_answer.answer, 
           is_checked: new_question_answer.is_checked || old_question_answer.is_checked, 
           expert_id: new_question_answer.expert_id || old_question_answer.expert_id, 
        })
        res.ok(200,{message: "Question Answer updated!"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const deleteQuestion_AnswerById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Question_Answer.findByIdAndDelete(id)
        res.ok(200,{message: "deleted!"})
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


module.exports = {
    addQuestion_Answer,
    getQuestion_Answer,
    updateQuestion_AnswerById,
    deleteQuestion_AnswerById
}