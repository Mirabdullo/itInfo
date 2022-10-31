const {Router} = require("express")
const { getSynonym, addSynonym, updateSynonymById, deleteSynonymById } = require("../controllers/synonym.controller")
const adminPolice = require("../middleware/adminPolice")
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getSynonym)
router.post("/add", adminPolice, Validator("synonym"), addSynonym)
router.put("/:id", adminPolice, Validator("synonym"), updateSynonymById)
router.delete("/:id", adminPolice, Validator("synonym"), deleteSynonymById)

module.exports = router