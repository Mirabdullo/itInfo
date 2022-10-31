const { checkId } = require("../helper/helper")
const Author_Social = require("../models/Author_Social")
const Social = require("../models/Social")
const Author = require("../models/Author")
const { author_socialValidation } = require("../validations/author_social")
const ApiError = require("../error/ApiError");

const getAuthor_Social = async (req,res) => {
    try {
        const author_social = await Author_Social.find({})
        res.ok(200,author_social)
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const addAuthor_Social = async (req,res) => {
    try {
        const {error} = author_socialValidation(req.body)
        if(error){
            console.log(error);
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {author_id,social_id,social_link} = req.body

        if(!author_id || !social_id || !social_link){
            return res.error(400,{friendlyMsg: "Ma'lumotlarni to'liq kiriting!"})
        }
        checkId(author_id)
        const author = await Author.findById(author_id)
        if(!author){
            return res.error(400,{friendlyMsg: "Idga tegishli Author topilmadi!"})
        }

        checkId(social_id)
        const social = await Social.findById(social_id)
        if(!social){
            return res.error(400,{friendlyMsg: "Idga tegishli social topilmadi"})
        }

        const newAuthorSocial = await Author_Social({author_id,social_id,social_link})
        newAuthorSocial.save()
        res.ok(200,"Author Social added!")

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const updateAuthor_Social = async (req,res) => {
    try {
        const id = req.body
        checkId(id)
        const authorSocial = await Author_Social.findById(id)
        if(!authorSocial){
            return res.error(400,{friendlyMsg: "Author Socialda bu idga tegishli ma'lumot topilmadi"})
        }

        const newauthorSocial = req.body
        
        await Author_Social.findByIdAndUpdate(id,{
            author_id: newauthorSocial.author_id || authorSocial.author_id,
            social_id: newauthorSocial.social_id || authorSocial.social_id,
            social_link: newauthorSocial.social_link || authorSocial.social_link
        })
        res.ok(200, "Updated Author_Social")

    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

const deleteAuthor_Social = async (req,res) => {
    try {
        checkId(req.params.id)
        await Author_Social.findByIdAndDelete(req.params.id)
        res.ok(200,"Author Social deleted!")
    } catch (error) {
        ApiError.internal(res,{
            message:error,
            friendlyMsg: "Serverda xatolik"
        })
    }
}

module.exports = {
    getAuthor_Social,
    addAuthor_Social,
    updateAuthor_Social,
    deleteAuthor_Social,
}