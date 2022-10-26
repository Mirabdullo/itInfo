const { errorHendler, checkId } = require("../helper/helper")
const Admin = require("../models/Admin");
const { adminValidation } = require("../validations/admin");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');


const addAdmin = async (req,res) =>{
    try {
        const {error, value} = adminValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {admin_name,admin_email, admin_password,admin_is_active, admin_is_creator} = value

        if(!admin_name || !admin_email || !admin_password){
            return res.status(400).send("Ma'lumotlarni to'liq kiriting!")
        }
         
        if(await Admin.findOne({admin_email})){
            return res.status(400).send("This admin is already added!")
        }
        const adminHashedPassword = bcrypt.hashSync(admin_password,7)

        const newAdmin = await Admin({admin_name,admin_email, admin_password: adminHashedPassword,admin_is_active, admin_is_creator})
        newAdmin.save()
        res.status(200).send("Admin added!")
    } catch (error) {
        errorHendler(res,error)
    }
}


const generateAccessToken = (id,admin_is_active) => {
    const payload = {
        id,
        admin_is_active
    }
    return jwt.sign(payload,config.get("secret"), {expiresIn: "12h"})
}


const loginAdmin = async (req,res) => {
    try {
        const {login, password} = req.body
        const admin = await Admin.findOne({$or: [{admin_email:login},{admin_name:login}]})
        if(!admin) return res.status(400).send("login invalid")

        const validPassword = bcrypt.compareSync(
            password,
            admin.admin_password
        )
        if(!validPassword) return res.status(400).send("Password invalid")
        const token = generateAccessToken(admin._id,admin.admin_is_active)
        res.status(200).send(token)
    } catch (error) {
        errorHendler(res,error)
    }
}




const getAdmin = async (req,res) =>{
    try {
        const admin = await Admin.find({})
        if(!admin) return res.status(400).send("Ma'lumot topilmadi")
        res.status(200).send(admin)
    } catch (error) {
        errorHendler(res,error)
    }
}



const updateAdminById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        const old_admin = await Admin.findById(id)
        if(!old_admin) return res.status(400).send("Bu idga tegishli ma'lumot topilmadi!")

        const new_admin = req.body

        await Admin.findByIdAndUpdate(id,{
            admin_name: new_admin.admin_name || old_admin.admin_name,
            admin_name: new_admin.admin_email || old_admin.admin_email,
            admin_name: new_admin.admin_password || old_admin.admin_password,
            admin_name: new_admin.admin_is_active || false, 
            admin_name: new_admin.admin_is_creator || false
        })
        res.status(200).send("Admin updated!")
    } catch (error) {
        errorHendler(res,error)
    }
}



const deleteAdminById = async (req,res) =>{
    try {
        const id = req.params.id
        checkId(id)
        await Admin.findByIdAndDelete(id)
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addAdmin,
    getAdmin,
    loginAdmin,
    updateAdminById,
    deleteAdminById
}