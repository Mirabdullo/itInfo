const { errorHendler, checkId } = require("../helper/helper")
const Description = require("../models/Description")
const Dictionary = require("../models/Dictionary")
const Synonym = require("../models/Synonym")
const { synonymValidation } = require("../validations/synonym")


const addSynonym = async (req,res) => {
    try {
        const {error} = synonymValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const {dict_id,desc_id} = req.body
        if(!dict_id || !desc_id) return res.status(400).send({message: "Ma'lumotlarni to'liq kiriting!"})

        checkId(dict_id)
        checkId(desc_id)
        if(!(await Dictionary.findById(dict_id))){
            return res.status(400).send({message: "Bu idga tegisshli ma'lumot topilmadi!"})
        }        

        if(!(await Description.findById(desc_id))){
            return res.status(400).send({message: "Bu idga tegisshli ma'lumot topilmadi!"})
        }

        const newSnonym = await Synonym({dict_id,desc_id})
        newSnonym.save()
        res.status(200).send({message: "New Synonym added",newSnonym}) 

    } catch (error) {
        errorHendler(res,error)
    }
}

const getSynonym = async (req,res) => {
    try {
        const synonyms = await Synonym.find({})
        res.status(200).send(synonyms)
    } catch (error) {
        errorHendler(res,error)
    }
}

const updateSynonymById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        const old_Synonym = await Synonym.findById(id)
        if(!old_Synonym) return res.status(400).send({message: "Bu idga tegishli ma'lumot topilmadi"})

        const new_Synonym = req.body
        if(new_Synonym.dict_id && (!checkId(new_Synonym.dict_id) || !(await Dictionary.findById(new_Synonym.dict_id)))){
            return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})
        }
        if(new_Synonym.desc_id && (!checkId(new_Synonym.desc_id) || !(await Description.findById(new_Synonym.desc_id)))){
            return res.status(400).send({message: "idga tegishli ma'lumot topilmadi"})
        }

        await Synonym.findByIdAndUpdate(id,{
            dict_id: new_Synonym.dict_id || old_Synonym.dict_id,
            desc_id: new_Synonym.desc_id || old_Synonym.desc_id
        })
        res.status(200).send({message: "Updated!"})
    } catch (error) {
        errorHendler(res,error)
    }
}

const deleteSynonymById = async (req,res) => {
    try {
        const id = req.params.id
        checkId(id)
        await Synonym.findByIdAndDelete(id)
    } catch (error) {
        errorHendler(res,error)
    }
}


module.exports = {
    addSynonym,
    getSynonym, 
    updateSynonymById,
    deleteSynonymById
}