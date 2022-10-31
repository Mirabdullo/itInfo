const {Router} = require('express');
const { addDictionary, getDictionarys, getDictionary, updateDictionary, deleteDictionary } = require('../controllers/dictionary.controller');
const adminPolice = require('../middleware/adminPolice');
const Validator = require("../middleware/validator")


const router = Router()

router.get("/",getDictionarys)
router.get("/:id",getDictionary)
router.post("/add",adminPolice,Validator("dictionary"), addDictionary)
router.put("/:id",adminPolice,Validator("dictionary"), updateDictionary)
router.delete("/:id",adminPolice,deleteDictionary)

module.exports = router