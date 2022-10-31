const { checkId } = require("../helper/helper")
const User = require("../models/User")
const { userValidation } = require("../validations/user")
const bcrypt = require("bcryptjs")
const jwt = require('../services/JwtService');
const config = require('config');
const joi = require('joi');
const ApiError = require("../error/ApiError");

const addUser = async (req,res) =>{
    try {
        const {user_name,user_email, user_password,user_info, user_photo} = req.body

        if(!user_name || !user_email || !user_password || !user_info){
            return res.error(400,{friendlyMsg:"Ma'lumotlarni to'liq kiriting!"})
        }
        if(await User.findOne({user_email})){
            return res.error(400,{ friendlyMsg: "User already added"})
        }
        const userHashedPassword = bcrypt.hashSync(user_password,7)

        const newUser = await User({user_name,user_email, user_password: userHashedPassword,user_info, user_photo})
        newUser.save()
        res.ok(200,"User added!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const emailValidation = email => {
    const checkEmail = joi.string().email().validate(email)
    return checkEmail.error ? false : true}

const loginUser = async (req,res) => {
    try {
        const {login,password} = req.body
        if(!login || !password) return res.error(400,{friendlyMsg:"User password not entered"})
        if(!emailValidation(login)) return res.error(400,{friendlyMsg: "Email noto'g'ri"})
        const user = await User.findOne({user_email:login})
        if(!user) return res.error(400,{friendlyMsg:"User topilmadi"})
        const validPassword = bcrypt.compareSync(
            password,
            user.user_password
            )
            if(!validPassword) return res.error(400,{friendlyMsg:"Invalid password"})
            
            const payload = {
                id: user._id,
            }
            const token = jwt.generateTokens(payload)
            user.user_token = token.refreshToken
            await user.save()
            res.cookie("refreshToken", token.refreshToken, {
            maxAge: config.get('refresh_ms'),
            httpOnly:true
        })
        res.ok(200,token)

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const logoutUser = async (req,res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) return res.error(400,{friendlyMsg: 'Tokenni kiriting!'})
        const user = await User.findOneAndUpdate(
            {user_token: refreshToken},
            {user_token: ''},
            {new: true}
        )

        if(!user) return res.error(400,{friendlyMsg: "User topilmadi"})
        res.clearCookie('refreshToken')
        res.ok(200,user)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const refreshUserToken = async (req,res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) return res.error(400,{friendlyMsg: "Tokenni kiriting!"})
        const userDataFromCookies = await jwt.verifyRefresh(refreshToken)
        const userDataFromDB = await User.findOne({user_token: refreshToken})
        if(!userDataFromCookies || !userDataFromDB){
            return res.error(400,{friendlyMsg: "User ro'yxatdan o'tmagan"})
        }
        const user = await User.findById(userDataFromCookies.id)
        if(!user) return res.error(400,{friendlyMsg: "User topilmadi"})

        const payload = {
            id: user._id
        }
        const token = jwt.generateTokens(payload)
        user.user_token = token.refreshToken
        await user.save()
        res.cookie('refreshToken',token.refreshToken,{
            maxAge: config.get('refresh_ms'),
            httpOnly: true
        })
        res.ok(200,token)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}




const getUser = async (req,res) =>{
    try {
        const user = await User.find({})
        res.ok(200,user)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}



const updateUserById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        const old_user = await User.findById(id)
        if(!old_user) return res.error(400,{friendlyMsg: `${id} tegishli ma'lumot topilmadi!`})

        const new_user = req.body

        await User.findByIdAndUpdate(id,{
            user_name: new_user.user_name || old_user.user_name,
            user_name: new_user.user_email || old_user.user_email,
            user_name: new_user.user_password || old_user.user_password,
            user_name: new_user.user_info || old_user.user_info, 
            user_name: new_user.user_photo || old_user.user_photo
        })
        res.ok(200,"User updated!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}



const deleteUserById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        await User.findByIdAndDelete(id)
        res.ok(200,"Deleted!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


module.exports = {
    addUser,
    getUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    updateUserById,
    deleteUserById
}