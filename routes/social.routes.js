const {Router} = require("express")
const { addSocial, getSocial, getSocialById, updateSocial, deleteSocial } = require("../controllers/socil.controller")


const router = Router()

router.post("/add",addSocial)
router.get("/",getSocial)
router.get("/:id", getSocialById)
router.put("/:id",updateSocial)
router.delete("/:id",deleteSocial)

module.exports = router