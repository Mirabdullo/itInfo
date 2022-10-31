const {Router} = require("express")
const { getDesc_Topic, addDesc_Topic, updateDesc_TopicById, deleteDesc_TopicById } = require("../controllers/desc_topic.controller")
const adminPolice = require("../middleware/adminPolice")
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getDesc_Topic)
router.post("/add",adminPolice,Validator("descTopic"), addDesc_Topic)
router.put("/:id",adminPolice,Validator("descTopic"), updateDesc_TopicById)
router.delete("/:id",adminPolice,deleteDesc_TopicById)

module.exports = router