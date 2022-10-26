const { errorHendler, checkId } = require("../helper/helper")
const Author = require("../models/Author")
const Question_Answer = require("../models/Question_Answer")
const { question_answerValidation } = require("../validations/question_answer")



const addQuestion_Answer = async (req,res) => {
    try {
        const {error} = question_answerValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {question,answer,is_checked,expert_id} = req.body
        if(!question || !answer || !expert_id){
            return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting"})
        }

        checkId(expert_id)
        if(!(await Author.findById(expert_id))){
            return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})
        }

        const newQuestion_Answer = await Question_Answer({
            question,
            answer,
            is_checked: is_checked || false,
            expert_id
        })
        newQuestion_Answer.save()
        res.status(200).send({message: "Question Answer added!"})


    } catch (error) {
        errorHendler(res,error)
    }
}

const getQuestion_Answer = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const question_answer = await Question_Answer.find({})
        res.status(200).send(question_answer)
    } catch (error) {
        errorHendler(res,error)
    }
}


const updateQuestion_AnswerById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        
        const old_question_answer = await Question_Answer.findById(id)
        if(!old_question_answer) return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})

        const new_question_answer = req.body

        if(new_question_answer.expert_id && !(await Author.findById(new_question_answer.expert_id))){
            return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})
        }

        await Question_Answer.findByIdAndUpdate(id,{
           question: new_question_answer.question || old_question_answer.question, 
           answer: new_question_answer.answer || old_question_answer.answer, 
           is_checked: new_question_answer.is_checked || old_question_answer.is_checked, 
           expert_id: new_question_answer.expert_id || old_question_answer.expert_id, 
        })
        res.status(200).send({message: "Question Answer updated!"})
    } catch (error) {
        errorHendler(res,error)
    }
}


const deleteQuestion_AnswerById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Question_Answer.findByIdAndDelete(id)
        res.status(200).send({message: "deleted!"})
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addQuestion_Answer,
    getQuestion_Answer,
    updateQuestion_AnswerById,
    deleteQuestion_AnswerById
}