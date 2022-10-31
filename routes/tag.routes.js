const {Router} = require("express")
const { getTag, addTag, updateTagById, deleteTagById } = require("../controllers/tag.controller")
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getTag)
router.post("/add", Validator("tag"), addTag)
router.put("/:id", Validator("tag"), updateTagById)
router.delete("/:id",deleteTagById)

module.exports = router