const { errorHendler, checkId } = require("../helper/helper")
const User = require("../models/User")
const { userValidation } = require("../validations/user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const config = require('config');


const addUser = async (req,res) =>{
    try {
        const {error} = userValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {user_name,user_email, user_password,user_info, user_photo} = req.body

        if(!user_name || !user_email || !user_password || !user_info){
            return res.status(400).send("Ma'lumotlarni to'liq kiriting!")
        }
        const userHashedPassword = bcrypt.hashSync(user_password,7)

        const newUser = await User({user_name,user_email, user_password: userHashedPassword,user_info, user_photo})
        newUser.save()
        res.status(200).send("User added!")
    } catch (error) {
        errorHendler(res,error)
    }
}


const generateAccessToken = (id) => {
    const payload = {id}
    return jwt.sign(payload,config.get('secret'), {expiresIn: '8h'})
}


const loginUser = async (req,res) => {
    try {
        const {login,password} = req.body
        if(!login || !password) return res.status(400).send("login or password not entered")
        const user = await User.findOne({$or: [{user_name:login},{user_email:login}]})
        if(!user) return res.status(400).send("login invalid")

        const validPassword = bcrypt.compareSync(
            password,
            user.user_password
        )
        if(!validPassword) return res.status(400).send("Invalid password")
        const token = generateAccessToken(user._id)

        res.status(200).send(token)

    } catch (error) {
        errorHendler(res,error)
    }
}



const getUser = async (req,res) =>{
    try {
        const user = await User.find({})
        res.status(200).send(user)
    } catch (error) {
        errorHendler(res,error)
    }
}



const updateUserById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        const old_user = await User.findById(id)
        if(!old_user) return res.status(400).send("Bu idga tegishli ma'lumot topilmadi!")

        const new_user = req.body

        await User.findByIdAndUpdate(id,{
            user_name: new_user.user_name || old_user.user_name,
            user_name: new_user.user_email || old_user.user_email,
            user_name: new_user.user_password || old_user.user_password,
            user_name: new_user.user_info || old_user.user_info, 
            user_name: new_user.user_photo || old_user.user_photo
        })
        res.status(200).send("User updated!")
    } catch (error) {
        errorHendler(res,error)
    }
}



const deleteUserById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        await User.findByIdAndDelete(id)
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addUser,
    getUser,
    loginUser,
    updateUserById,
    deleteUserById
}