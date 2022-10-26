const {Router} = require('express');
const { addTopic, getTopic, updateTopicById, deleteTopic } = require('../controllers/topic.controller');


const router = Router()

router.get("/",getTopic)
// router.get("/:id",getTopicById)
router.post("/add",addTopic)
router.put("/:id",updateTopicById)
router.delete("/:id",deleteTopic)

module.exports = router