const {Router} = require('express');
const { getCategorys, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const adminPolice = require('../middleware/adminPolice');
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getCategorys)
router.get("/:id",getCategory)
router.post("/add",adminPolice,Validator("category"), addCategory)
router.put("/:id",adminPolice,Validator("category"),updateCategory)
router.delete("/:id",adminPolice,deleteCategory)

module.exports = router