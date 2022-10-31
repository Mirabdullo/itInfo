const {Router} = require("express")
const { addAuthor, getAuthor, getAuthorById, updateAuthorById, deleteAuthor, loginAuthor, logoutAuthor, refreshAuthorToken } = require("../controllers/author.controller")
const authorPolice = require("../middleware/authorPolice")
const authorRolePolice = require("../middleware/authorRolePolice")
const Validator = require("../middleware/validator")

const router = Router()

router.post("/add",authorPolice,Validator("author"), addAuthor)
router.get("/",getAuthor)
router.get("/refresh",refreshAuthorToken)
router.post("/login",Validator("email_passAuthor"),loginAuthor)
router.post('/logout',logoutAuthor)
router.get("/:id", getAuthorById)
router.put("/:id",authorPolice,Validator("author"), updateAuthorById)
router.delete("/:id",authorPolice,deleteAuthor)

module.exports = router