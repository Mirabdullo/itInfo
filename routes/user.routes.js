const {Router} = require('express');
const { getUser, addUser, updateUserById, deleteUserById, loginUser } = require('../controllers/user.controller');

const router = Router()

router.get("/",getUser)
router.post("/add",addUser)
router.post("/login",loginUser)
router.put("/:id",updateUserById)
router.delete("/:id",deleteUserById)


module.exports = router