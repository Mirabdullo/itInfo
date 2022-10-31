const Author = require("../models/Author")
const {checkId} = require("../helper/helper")
const {authorValidation} = require("../validations/author")
const bcrypt = require('bcryptjs');
const jwt = require('../services/JwtService');
const config = require('config');
const ApiError = require("../error/ApiError");
const addAuthor = async (req, res) => {
    try {
        const {error,value} = authorValidation(req.body)
        if(error){
            console.log(error);
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {
            author_first_name, 
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_password,
            author_info,
            author_position,
            author_photo,
            is_expert
        } = value
        if(!author_first_name || !author_last_name || !author_nick_name || !author_email || !author_phone || !author_password || !author_info || !author_position || !author_photo ){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})
        }

        const authorHashedPassword = bcrypt.hashSync(author_password,7)

        const newAuthor = await Author({ author_first_name, 
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_password: authorHashedPassword,
            author_info,
            author_position,
            author_photo,
            is_expert: is_expert || false})
        newAuthor.save()
        res.ok(200,{message: "Added author!"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}






const loginAuthor = async (req,res) =>{
    try {
        const {login, password} = req.body

        const author = await Author.findOne({$or: [{author_nick_name: login}, {author_phone: login}, {author_email: login}]})
        if(!author) return res.error(400,{friendlyMsg:" parol noto'g'ri"})
        console.log(author.id);
        
        const validPassword = bcrypt.compareSync(
            password,
            author.author_password
            )
        if(!validPassword) return res.error(400,{friendlyMsg:" parol noto'g'ri"})
        const payload = {
            id: author._id,
            is_expert: author.is_expert,
        }
        const token = jwt.generateTokens(payload)
        author.author_token = token.refreshToken
        await author.save()
        res.cookie("refreshToken", token.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true
        })
            
        res.ok(200,token)

    } catch (error) {
        res.error(400,{friendlyMsg:error.message})
    }
}


const logoutAuthor = async (req,res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) return res.error(400,{friendlyMsg: "Token noto'g'ri"})
        const author = await Author.findOneAndUpdate(
            {author_token: refreshToken},
            {author_token: ""},
            {new: true}
        )
        if(!author) return res.error(400,{friendlyMsg: "Author topilmadi"})

        res.clearCookie("refreshToken")
        res.ok(200,author)

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}



const refreshAuthorToken = async (req,res) => {
    try {
        const {refreshToken} = req.cookies
        if(!refreshToken) return res.error(400,{friendlyMsg: "Token noto'g'ri"})
        const authorDataFromCookies = await jwt.verifyRefresh(refreshToken)

        const authorDataFromDB = await Author.findOne({author_token: refreshToken})
        if(!authorDataFromCookies || !authorDataFromDB) {
            return res.error(400,{friendlyMsg: "Author ro'yxatdan o'tmagan"})
        }
        const author = await Author.findById(authorDataFromCookies.id)
        if(!author) return res.error(400,{friendlyMsg: "Author topilmadi"})

        const payload = {
            id: author._id,
            is_expert: author.is_expert
        }

        const tokens = jwt.generateTokens(payload)
        author.author_token = tokens.refreshToken
        await author.save()
        res.cookie("refreshToken", tokens.refreshToken, {
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



const getAuthor = async (req,res) => {
    try{
        const author = await Author.find({})
        console.log(author);
        res.ok(200,author)
    }catch (error){
        res.error(400,{friendlyMsg:error})
    }
}

const getAuthorById = async (req,res) => {
    try {
        const id = req.params.id
        const author = await Author.findById(id)
        res.ok(200,author)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const updateAuthorById = async (req,res) =>{
    try {
        const id = req.params.id
        const old_author = await Author.findById(id)
        const upAuthor = req.body
        console.log(upAuthor);
        await Author.findByIdAndUpdate(id,({
            author_first_name: upAuthor.author_first_name || old_author.author_first_name,
            author_last_name: upAuthor.author_last_name || old_author.author_last_name,
            author_nick_name: upAuthor.author_nick_name || old_author.author_nick_name,
            author_email: upAuthor.author_email || old_author.author_email,
            author_phone: upAuthor.author_phone || old_author.author_phone,
            author_password: upAuthor.author_password ||old_author.author_password,
            author_info: upAuthor.author_info || old_author.author_info,
            author_position: upAuthor.author_position || old_author.author_position,
            author_photo: upAuthor.author_photo || old_author.author_photo,
            is_expert: upAuthor.is_expert || false
        }))
        res.ok(200,{message: "Updated author info!"})
    } catch (error) {
        res.error(400,{friendlyMsg:error.message})
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id 
        checkId(id)
        await Author.findByIdAndDelete(id)
        res.ok(200,{message: "Author deleted!"})
    } catch (error) {
        res.error(400,{friendlyMsg:error.message})
    }
}

module.exports = {
    addAuthor,
    getAuthor,
    getAuthorById,
    updateAuthorById,
    deleteAuthor,
    loginAuthor,
    logoutAuthor,
    refreshAuthorToken
}