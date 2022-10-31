const {Router} = require("express")
const { getMedia, addMedia, updateMediaById, deleteMediaById } = require("../controllers/media.controller")
const adminPolice = require("../middleware/adminPolice")
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getMedia)
router.post("/add",adminPolice,Validator("media"), addMedia)
router.put("/:id",adminPolice,Validator("media"), updateMediaById)
router.delete("/:id",adminPolice,deleteMediaById)

module.exports = router