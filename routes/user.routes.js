const {Router} = require('express');
const { getUser, addUser, updateUserById, deleteUserById, loginUser, logoutUser, refreshUserToken } = require('../controllers/user.controller');
const Validator = require("../middleware/validator")
const userPolice = require('../middleware/userPolice');
const router = Router()

router.get("/",getUser)
router.post("/add",userPolice,Validator("user"),addUser)
router.post("/login",Validator("email_passUser"),loginUser)
router.post('/logout',logoutUser)
router.get('/refresh', refreshUserToken)
router.put("/:id",userPolice,Validator("user"),updateUserById)
router.delete("/:id",deleteUserById)


module.exports = router