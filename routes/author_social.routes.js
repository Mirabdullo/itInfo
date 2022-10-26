const {Router} = require('express');
const { getAuthor_Social, addAuthor_Social, updateAuthor_Social, deleteAuthor_Social } = require('../controllers/author_social.controller');



const router = Router()

router.get("/",getAuthor_Social)
router.post("/add",addAuthor_Social)
router.put("/:id",updateAuthor_Social)
router.delete("/:id",deleteAuthor_Social)


module.exports = router