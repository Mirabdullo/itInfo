const {Router} = require("express")
const { getDescriptions, addDescription, getDescriptionById, updateDescriptionById, deleteDescriptionById } = require("../controllers/description.controller")
const adminPolice = require("../middleware/adminPolice")

const router = Router()

router.get("/",getDescriptions)
router.get("/:id",getDescriptionById)
router.post("/add",adminPolice, addDescription)
router.put("/:id",adminPolice,updateDescriptionById)
router.delete("/:id",adminPolice,deleteDescriptionById)

module.exports = router