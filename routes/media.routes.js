const {Router} = require("express")
const { getMedia, addMedia, updateMediaById, deleteMediaById } = require("../controllers/media.controller")


const router = Router()

router.get("/",getMedia)
router.post("/add",addMedia)
router.put("/:id",updateMediaById)
router.delete("/:id",deleteMediaById)

module.exports = router