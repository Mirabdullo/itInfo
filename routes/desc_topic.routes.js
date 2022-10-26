const {Router} = require("express")
const { getDesc_Topic, addDesc_Topic, updateDesc_TopicById, deleteDesc_TopicById } = require("../controllers/desc_topic.controller")
const adminPolice = require("../middleware/adminPolice")


const router = Router()

router.get("/",getDesc_Topic)
router.post("/add",adminPolice, addDesc_Topic)
router.put("/:id",adminPolice,updateDesc_TopicById)
router.delete("/:id",adminPolice,deleteDesc_TopicById)

module.exports = router