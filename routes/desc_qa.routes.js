const {Router} = require("express")
const { getDesc_QA, addDesc_QA, updateDesc_QAById, deleteDesc_QAById } = require("../controllers/desc_qaa.controller")
const adminPolice = require('../middleware/adminPolice')

const router = Router()

router.get("/",getDesc_QA)
router.post("/add",adminPolice,addDesc_QA)
router.put("/:id",adminPolice,updateDesc_QAById)
router.delete("/:id",adminPolice,deleteDesc_QAById)

module.exports = router