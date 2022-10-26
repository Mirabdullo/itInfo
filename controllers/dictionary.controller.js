const Dictionary = require("../models/Dictionary")
const { dictionaryValidation } = require("../validations/dictionary")


const errorHendler = (res,error) => {
    res.status(500).send({message: error.message})
}


const addDictionary = async (req,res) => {
    try {
        const {error} = dictionaryValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {term} = req.body
        if(term === ''){
            return res.status(400).send("Ma'lumotni to'liq kiriting!")
        }
 
        if(await Dictionary.findOne({term: {$regex: term, $options: "i"}})){
            return res.status(400).send({message: "Bunday termin bor"})
        }


        const newTermtionary = await Dictionary({term,letter:term[0]})
        await newTermtionary.save()
        res.status(200).send({message:"Added dictionary"})
    } catch (error) {
        errorHendler(res,error)
    }
}

const getDictionarys  = async (req,res) =>{
    try {
        const allDictionary = await Dictionary.find({})
        res.status(200).send(allDictionary)
    } catch (error) {
        errorHendler(res,error)
    }
}


const getDictionary = async (req,res) =>{
    try {
        const dictionary = await Dictionary.findById(req.params.id)
        if(!dictionary){
            return res.status(400).send({message: "Bu idga tegishli ma'lumot topilmadi"})
        }

        res.status(200).send(dictionary)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateDictionary = async (req, res) =>{
    try {
        const old_dic = await Dictionary.findById(req.params.id)
        const {term} = req.body
        if(await Dictionary.findOne({term: {$regex: term, $options: "i"}})){
            return res.status(500).send({message: "Bazada bunday ma'lumot bor!"})
        }

        await Dictionary.findByIdAndUpdate(req.params.id, {
            term: req.body.term || old_dic.term,
            letter: req.body.term[0] || old_dic.term[0]
        })
        res.status(200).send({message: "Ma'lumot yangilandi!"})
    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteDictionary = async (req,res) =>{
    try {
        const dic = await Dictionary.findById(req.params.id)
        await Dictionary.findByIdAndDelete(req.params.id)
        res.status(200).send({message: `${dic} termini bazadan o'chirildi`})
    } catch (error) {
        errorHendler(res,error)
    }
}




module.exports = {
    addDictionary,
    getDictionary,
    getDictionarys,
    updateDictionary,
    deleteDictionary
}