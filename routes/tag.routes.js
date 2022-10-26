const {Router} = require("express")
const { getTag, addTag, updateTagById, deleteTagById } = require("../controllers/tag.controller")


const router = Router()

router.get("/",getTag)
router.post("/add",addTag)
router.put("/:id",updateTagById)
router.delete("/:id",deleteTagById)

module.exports = router