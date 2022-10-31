
class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(res,errorMessage){
        return res.error(400,400,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static unauthorized(res,message,friendlyMsg){
        return res.error(400,401,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static forbidden(res,message,friendlyMsg){
        return res.error(400,403,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static notFound(res,message,friendlyMsg){
        return res.error(400,404,{
            message: errorMessage.message,
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
    static internal(res,message,friendlyMsg){
        console.log(errorMessage.message);
        return res.error(400,500,{
            friendlyMsg: errorMessage.friendlyMsg
        })
    }
}

module.exports = ApiError