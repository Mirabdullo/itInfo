const Author = require("../models/Author")
const {errorHendler,checkId} = require("../helper/helper")
const {authorValidation} = require("../validations/author")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const addAuthor = async (req, res) => {
    try {
        const {error,value} = authorValidation(req.body)
        if(error){
            console.log(error);
            return res.status(400).send({message: error.details[0].message})
        }
        const {
            author_first_name, 
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_passwor,
            author_info,
            author_position,
            author_photo,
            is_expert
        } = value
        if(!author_first_name || !author_last_name || !author_nick_name || !author_email || !author_phone || !author_passwor || !author_info || !author_position || !author_photo ){
            return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting!"})
        }

        const authorHashedPassword = bcrypt.hashSync(author_passwor,7)

        const newAuthor = await Author({ author_first_name, 
            author_last_name,
            author_nick_name,
            author_email,
            author_phone,
            author_passwor: authorHashedPassword,
            author_info,
            author_position,
            author_photo,
            is_expert: is_expert || false})
        newAuthor.save()
        res.status(200).send({message: "Added author!"})
    } catch (error) {
        errorHendler(res,error)
    }
}


const generateAccessToken = (id,is_expert,authorRoles) => {
    const payload = {
        id,
        is_expert,
        authorRoles,
    }
    return jwt.sign(payload,config.get('secret'), {expiresIn: '8h'})
}




const loginAuthor = async (req,res) =>{
    try {

        const {author_nick_name, author_passwor} = req.body

        const author = await Author.findOne({author_nick_name})
        if(!author) return res.status(400).send("nick yoki parol noto'g'ri")
        
        const validPassword = bcrypt.compareSync(
            author_passwor,
            author.author_passwor
            )
            
        if(!validPassword) return res.status(400).send("nick yoki parol noto'g'ri")

        const token = generateAccessToken(author._id,author.is_expert, ["READ","WRITE"])
            
        res.status(200).send(token)

    } catch (error) {
        errorHendler(res,error)
    }
}





const getAuthor = async (req,res) => {
    try{
        const author = await Author.find({})
        res.status(200).send(author)
    }catch (error){
        errorHendler(res,error)
    }
}

const getAuthorById = async (req,res) => {
    try {
        const id = req.params.id
        const author = await Author.findById(id)
        res.status(200).send(author)
    } catch (error) {
        errorHendler(res,error)
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
            author_passwor: upAuthor.author_passwor ||old_author.author_passwor,
            author_info: upAuthor.author_info || old_author.author_info,
            author_position: upAuthor.author_position || old_author.author_position,
            author_photo: upAuthor.author_photo || old_author.author_photo,
            is_expert: upAuthor.is_expert || false
        }))
        res.status(200).send({message: "Updated author info!"})
    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteAuthor = async (req, res) => {
    try {

        req.params.id 
        checkId(id)
        await Author.findByIdAndDelete(id)
        res.status(200).send({message: "Author deleted!"})
    } catch (error) {
        errorHendler(res,error)
    }
}

module.exports = {
    addAuthor,
    getAuthor,
    getAuthorById,
    updateAuthorById,
    deleteAuthor,
    loginAuthor
}