const {Router} = require("express")
const { getQuestion_Answer, addQuestion_Answer, updateQuestion_AnswerById, deleteQuestion_AnswerById } = require("../controllers/question_answer.controller")


const router = Router()

router.get("/",getQuestion_Answer)
router.post("/add",addQuestion_Answer)
router.put("/:id",updateQuestion_AnswerById)
router.delete("/:id",deleteQuestion_AnswerById)

module.exports = router