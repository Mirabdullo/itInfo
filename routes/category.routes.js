const {Router} = require('express');
const { getCategorys, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const adminPolice = require('../middleware/adminPolice');


const router = Router()

router.get("/",getCategorys)
router.get("/:id",getCategory)
router.post("/add",adminPolice, addCategory)
router.put("/:id",adminPolice,updateCategory)
router.delete("/:id",adminPolice,deleteCategory)

module.exports = router