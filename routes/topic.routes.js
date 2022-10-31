const {Router} = require('express');
const { addTopic, getTopic, updateTopicById, deleteTopic } = require('../controllers/topic.controller');
const adminPolice = require('../middleware/adminPolice');
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getTopic)
router.post("/add", adminPolice, Validator("topic"), addTopic)
router.put("/:id", adminPolice, Validator("topic"), updateTopicById)
router.delete("/:id",deleteTopic)

module.exports = router