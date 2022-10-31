const jwt = require("../services/JwtService")
const config = require("config")

module.exports = async function(req,res,next) {
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            return res.status(403).send({message: "Admin ro'yxatdan o'tmagan1"})
        }
        const token = authorization.split(" ")[1]
        if(!token){
            return res.status(403).send({message: "Admin token kiritilmagan2"})
        }
        const decodedData = await jwt.verifyAccess(token,config.get("access_key"))
        console.log(decodedData.admin_is_active);
        if(decodedData.admin_is_active === undefined){
            return res.status(403).send({message: "Admin ro'yxatdan o'tmagan3"})
        }
        
        req.admin = decodedData
        console.log(decodedData);
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).send({message: "Admin ro'yxatdan o'tmagan4"})
    }
}