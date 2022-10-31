const Dictionary = require("../models/Dictionary")
const { dictionaryValidation } = require("../validations/dictionary")
const ApiError = require("../error/ApiError");


const addDictionary = async (req,res) => {
    try {
        const {error} = dictionaryValidation(req.body)
        if(error){
            return res.error(400,{friendlyMsg: error.details[0].message})
        }
        const {term} = req.body
        if(term === ''){
            return res.error(400,{friendlyMsg:"Ma'lumotni to'liq kiriting!"})
        }
 
        if(await Dictionary.findOne({term: {$regex: term, $options: "i"}})){
            return res.error(400,{friendlyMsg: "Bunday termin bor"})
        }


        const newTermtionary = await Dictionary({term,letter:term[0]})
        await newTermtionary.save()
        res.ok(200,{message:"Added dictionary"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const getDictionarys  = async (req,res) =>{
    try {
        const allDictionary = await Dictionary.find({})
        res.ok(200,allDictionary)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}


const getDictionary = async (req,res) =>{
    try {
        const dictionary = await Dictionary.findById(req.params.id)
        if(!dictionary){
            return res.error(400,{friendlyMsg: "Bu idga tegishli ma'lumot topilmadi"})
        }

        res.ok(200,dictionary)
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const updateDictionary = async (req, res) =>{
    try {
        const old_dic = await Dictionary.findById(req.params.id)
        const {term} = req.body
        if(await Dictionary.findOne({term: {$regex: term, $options: "i"}})){
            return res.error(400,{friendlyMsg: "Bazada bunday ma'lumot bor!"})
        }

        await Dictionary.findByIdAndUpdate(req.params.id, {
            term: req.body.term || old_dic.term,
            letter: req.body.term[0] || old_dic.term[0]
        })
        res.ok(200,{message: "Ma'lumot yangilandi!"})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}

const deleteDictionary = async (req,res) =>{
    try {
        const dic = await Dictionary.findById(req.params.id)
        await Dictionary.findByIdAndDelete(req.params.id)
        res.ok(200,{message: `${dic} termini bazadan o'chirildi`})
    } catch (error) {
        res.error(400,{friendlyMsg:error})
    }
}




module.exports = {
    addDictionary,
    getDictionary,
    getDictionarys,
    updateDictionary,
    deleteDictionary
}