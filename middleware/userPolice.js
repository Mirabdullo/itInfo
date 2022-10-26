const jwt = require('jsonwebtoken')
const config = require("config")

module.exports = function(req,res,next) {
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            return res.status(403).send({message: "User ro'yxatdan o'tmagan"})
        }
        const token = authorization.split(' ')[1]
        if(!token){
            return res.status(403).send({message: "User tokeni kiritilmagan"})
        }
        const decodedData = jwt.verify(token,config('secret'))

        req.user = decodedData
        console.log(decodedData);
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).send({message: "User ro'yxatdan o'tmagan"})
    }
}