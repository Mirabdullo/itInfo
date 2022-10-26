const {Router} = require("express")
const { getSynonym, addSynonym, updateSynonymById, deleteSynonymById } = require("../controllers/synonym.controller")


const router = Router()

router.get("/",getSynonym)
router.post("/add",addSynonym)
router.put("/:id",updateSynonymById)
router.delete("/:id",deleteSynonymById)

module.exports = router