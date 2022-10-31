const {Router} = require("express")
const { getQuestion_Answer, addQuestion_Answer, updateQuestion_AnswerById, deleteQuestion_AnswerById } = require("../controllers/question_answer.controller")
const userPolice = require("../middleware/userPolice")
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getQuestion_Answer)
router.post("/add",userPolice,Validator("questionAnswer"), addQuestion_Answer)
router.put("/:id",userPolice,Validator("questionAnswer"), updateQuestion_AnswerById)
router.delete("/:id", deleteQuestion_AnswerById)

module.exports = router