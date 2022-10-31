const {Router} = require("express")
const { getDescriptions, addDescription, getDescriptionById, updateDescriptionById, deleteDescriptionById } = require("../controllers/description.controller")
const adminPolice = require("../middleware/adminPolice")
const Validator = require("../middleware/validator")

const router = Router()

router.get("/",getDescriptions)
router.get("/:id",getDescriptionById)
router.post("/add",adminPolice,Validator("description"), addDescription)
router.put("/:id",adminPolice,Validator("description"), updateDescriptionById)
router.delete("/:id",adminPolice, deleteDescriptionById)

module.exports = router