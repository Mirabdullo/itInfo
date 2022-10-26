const {isValidObjectId} = require("mongoose")


const errorHendler = (res,error) =>{
    res.status(400).send(error.message)
}


function checkId(id) {
    if(isValidObjectId(id)){
        console.log("Dastur davom etmoqda");
    } else {
        console.log("Dastur tugatildi");
        return res.status(400).send({message: "Id invalid!"})
    }
}

module.exports = {
    errorHendler,
    checkId,
}