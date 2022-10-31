const {Router} = require("express")
const { addSocial, getSocial, getSocialById, updateSocial, deleteSocial } = require("../controllers/socil.controller")
const adminPolice = require("../middleware/adminPolice")
const Validator = require("../middleware/validator")


const router = Router()

router.post("/add",adminPolice, Validator("social"), addSocial)
router.get("/",getSocial)
router.get("/:id", getSocialById)
router.put("/:id",adminPolice, Validator("social"), updateSocial)
router.delete("/:id",adminPolice, deleteSocial)

module.exports = router