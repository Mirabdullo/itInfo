const { errorHendler, checkId } = require("../helper/helper")
const Author_Social = require("../models/Author_Social")
const Social = require("../models/Social")
const Author = require("../models/Author")
const { author_socialValidation } = require("../validations/author_social")


const getAuthor_Social = async (req,res) => {
    try {
        const author_social = await Author_Social.find({})
        res.status(200).send(author_social)
    } catch (error) {
        errorHendler(res,error)
    }
}

const addAuthor_Social = async (req,res) => {
    try {
        const {error} = author_socialValidation(req.body)
        if(error){
            console.log(error);
            return res.status(400).send({message: error.details[0].message})
        }
        const {author_id,social_id,social_link} = req.body

        if(!author_id || !social_id || !social_link){
            return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting!"})
        }
        checkId(author_id)
        const author = await Author.findById(author_id)
        if(!author){
            return res.status(400).send({message: "Idga tegishli Author topilmadi!"})
        }

        checkId(social_id)
        const social = await Social.findById(social_id)
        if(!social){
            return res.status(400).send({message: "Idga tegishli social topilmadi"})
        }

        const newAuthorSocial = await Author_Social({author_id,social_id,social_link})
        newAuthorSocial.save()
        res.status(200).send({message: "Author Social added!"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const updateAuthor_Social = async (req,res) => {
    try {
        const id = req.body
        checkId(id)
        const authorSocial = await Author_Social.findById(id)
        if(!authorSocial){
            return res.status(400).send({message: "Author Socialda bu idga tegishli ma'lumot topilmadi"})
        }

        const newauthorSocial = req.body
        
        await Author_Social.findByIdAndUpdate(id,{
            author_id: newauthorSocial.author_id || authorSocial.author_id,
            social_id: newauthorSocial.social_id || authorSocial.social_id,
            social_link: newauthorSocial.social_link || authorSocial.social_link
        })
        res.status(200).send({message: "Updated Author_Social"})

    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteAuthor_Social = async (req,res) => {
    try {
        checkId(req.params.id)
        await Author_Social.findByIdAndDelete(req.params.id)
    } catch (error) {
        errorHendler(res,error)
    }
}

module.exports = {
    getAuthor_Social,
    addAuthor_Social,
    updateAuthor_Social,
    deleteAuthor_Social,
}