const {Router} = require('express');

const dictionaryRoutes = require("./dictionary.routes")
const categoryRoutes = require("./category.routes")
const descriptionRoutes = require("./description.routes")
const socialRoutes = require("./social.routes")
const authorRoutes = require("./author.routes")
const topicRoutes = require('./topic.routes');
const author_socialRoutes = require('./author_social.routes')
const tagRoutes = require("./tag.routes")
const desc_topicRoutes = require("./desc_topic.routes")
const synonymRoutes = require("./synonym.routes")
const question_answerRoutes = require("./question_answer.routes")
const desc_QaRoutes = require("./desc_qa.routes")
const mediaRoutes = require("./media.routes")
const adminRoutes = require("./admin.routes")
const userRoutes = require("./user.routes")
const responses = require('./responses.routes')


const router = Router()
router.use(responses)

router.use("/api/dictionary",dictionaryRoutes)
router.use("/api/category",categoryRoutes)
router.use("/api/description",descriptionRoutes)
router.use("/api/social",socialRoutes)
router.use("/api/author",authorRoutes)
router.use("/api/topic",topicRoutes)
router.use("/api/author_social",author_socialRoutes)
router.use("/api/tag",tagRoutes)
router.use("/api/desc_topic",desc_topicRoutes)
router.use("/api/synonym",synonymRoutes)
router.use("/api/question_answer",question_answerRoutes)
router.use("/api/desc_qa",desc_QaRoutes)
router.use("/api/media",mediaRoutes)
router.use("/api/admin",adminRoutes)
router.use("/api/user",userRoutes)

module.exports = router