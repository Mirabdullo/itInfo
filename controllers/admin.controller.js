const Admin = require("../models/Admin");
const { adminValidation } = require("../validations/admin");
const bcrypt = require('bcryptjs');
const jwt = require("../services/JwtService");
const config = require('config');
const { checkId } = require("../helper/helper");
const joi = require('joi');
const ApiError = require("../error/ApiError");

const addAdmin = async (req,res) =>{
    try {
        const {error, value} = adminValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {admin_name,admin_email, admin_password,admin_is_active, admin_is_creator} = value

        if(!admin_name || !admin_email || !admin_password){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})
        }
         
        if(await Admin.findOne({admin_email})){
            return res.error(400,{friendlyMsg: "This admin is already added!"})
        }
        const adminHashedPassword = bcrypt.hashSync(admin_password,7)

        const newAdmin = await Admin({admin_name,admin_email, admin_password: adminHashedPassword,admin_is_active, admin_is_creator})
        newAdmin.save()
        res.ok(200,"Admin added!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const emailValidation = email => {
    const checkEmail = joi.string().email().validate(email)
    return checkEmail.error ? false : true
}



const loginAdmin = async (req,res) => {
    try {
        const {email, password} = req.body
        let admin
        if(!emailValidation(email)) return res.error(400,{friendlyMsg: "Email noto'g'ri"})
        admin = await Admin.findOne({admin_email:email})
        console.log(admin);
        if(!admin) return res.error(400,{friendlyMsg: "Admin topilmadi"})

        const validPassword = bcrypt.compareSync(
            password,
            admin.admin_password
        )
        if(!validPassword) return res.error(400,{friendlyMsg: "Password invalid"})
        const payload = {
            id: admin._id,
            admin_is_active: admin.admin_is_active,
            admin_is_creator: admin.admin_is_creator
        }
        const tokens = jwt.generateTokens(payload)
        console.log(tokens);
        admin.admin_token = tokens.refreshToken
        await admin.save()
        res.cookie("refreshToken",tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true
        })
        res.ok(200,tokens)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


const logoutAdmin = async (req,res) => {
    try {
        console.log(req.cookies);
        const {refreshToken} = req.cookies
        let admin;
        if(!refreshToken) return res.error(400,{friendlyMsg: "Token topilmadi"})
        admin = await Admin.findOneAndUpdate(
            {admin_token: refreshToken},
            {admin_token: ""},
            {new: true}
        )
        if(!admin) return res.error(400,{friendlyMsg: "Admin topilmadi"})

        res.clearCookie("refreshToken")
        res.ok(200,admin)

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
} 



const refreshAdminToken = async (req,res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) return res.error(400,{friendlyMsg: "Token topilmadi"})
        const adminDataFromCookies = await jwt.verifyRefresh(refreshToken)

        const adminDataFromDB = await Admin.findOne({admin_token: refreshToken})
        if(!adminDataFromCookies || !adminDataFromDB){
            return res.error(400,{friendlyMsg: "Admin ro'yxatdan o'tmagan"})
        }
        const admin = await Admin.findById(adminDataFromCookies.id)
        if(!admin) return res.error(400,{friendlyMsg: "ID noto'g'ri"})

        const payload = {
            id: admin._id,
            admin_is_active: admin.admin_is_active,
            admin_is_creator: admin.admin_is_creator
        }
        const tokens = jwt.generateTokens(payload)
        admin.admin_token = tokens.refreshToken
        await admin.save()
        res.cookie("refreshToken",tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true
        })
        res.ok(200,tokens)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}





const getAdmin = async (req,res) =>{
    try {
        const admin = await Admin.find({})
        if(!admin) return res.error(400,{friendlyMsg: "Ma'lumot topilmadi"})
        res.ok(200,admin)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}



const updateAdminById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        const old_admin = await Admin.findById(id)
        if(!old_admin) return res.error(400,{friendlyMsg: "Bu idga tegishli ma'lumot topilmadi!"})

        const new_admin = req.body

        await Admin.findByIdAndUpdate(id,{
            admin_name: new_admin.admin_name || old_admin.admin_name,
            admin_name: new_admin.admin_email || old_admin.admin_email,
            admin_name: new_admin.admin_password || old_admin.admin_password,
            admin_name: new_admin.admin_is_active || false, 
            admin_name: new_admin.admin_is_creator || false
        })
        res.ok(200,"Admin updated!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}



const deleteAdminById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        await Admin.findByIdAndDelete(id)
        res.ok(200,"Admin deleted!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}


module.exports = {
    addAdmin,
    getAdmin,
    loginAdmin,
    updateAdminById,
    deleteAdminById,
    logoutAdmin,
    refreshAdminToken
}