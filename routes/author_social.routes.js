const {Router} = require('express');
const { getAuthor_Social, addAuthor_Social, updateAuthor_Social, deleteAuthor_Social } = require('../controllers/author_social.controller');
const adminPolice = require('../middleware/adminPolice');
const Validator = require("../middleware/validator")



const router = Router()

router.get("/",getAuthor_Social)
router.post("/add",adminPolice,Validator("authorSocial"),addAuthor_Social)
router.put("/:id",adminPolice,Validator("authorSocial"),updateAuthor_Social)
router.delete("/:id",adminPolice,deleteAuthor_Social)


module.exports = router