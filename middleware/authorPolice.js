const jwt = require('../services/JwtService');
const config = require('config');

module.exports = async function (req,res,next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            return res.status(403).send({message: "Avtor ro'yxatdan o'tmagan"})
        }
        const token = authorization.split(" ")[1]
        if(!token){
            return res.status(403).send({message: "Avtor ro'yxatdan o'tmagan"})
        }
        [err, decodedData] = await to(jwt.verifyAccess(token,config.get('secret'), {}))
        if(err) {
            return res.error(400,{friendlyMsg: err})
        }
        req.author = decodedData
        console.log(decodedData);
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).send({message: "Avtor ro'yxatdan o'tmagan"})
    }
}

async function to(promise) {
    return promise
    .then((response) => [null, response])
    .catch((error) => [error])
}