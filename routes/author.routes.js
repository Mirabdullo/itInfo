const {Router} = require("express")
const { addAuthor, getAuthor, getAuthorById, updateAuthorById, deleteAuthor, loginAuthor } = require("../controllers/author.controller")
const authorPolice = require("../middleware/authorPolice")
const authorRolePolice = require("../middleware/authorRolePolice")

const router = Router()

router.post("/add",addAuthor)
router.get("/",authorPolice,getAuthor)
router.post("/login",loginAuthor)
router.get("/:id",authorRolePolice(["CHANGE"]), getAuthorById)
router.put("/:id",updateAuthorById)
router.delete("/:id",deleteAuthor)

module.exports = router