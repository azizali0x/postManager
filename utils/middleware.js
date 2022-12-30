const {ENV,SECRET} = require('./config')
const jwt = require('jsonwebtoken')
const {NotFoundRequestException,BadRequestException,ForbiddenRequestException} = require('../utils/helper')


const userAuth = (req,res,next)=>{
    const token = req.get("authorization");
    if(token == null){
        return BadRequestException(res,'authorization is required!')

    }else{
        try{
            const validToken = jwt.verify(token,SECRET);
            if(!validToken){
                return BadRequestException(res,'invalid token!')
            }
            const decode = jwt.decode(token)
            req.email = decode.email
            next();
        }catch(err){
            return BadRequestException(res,'invalid token!')
        }
    }
}

const unknownEndpoint = (request, response) => {
    return NotFoundRequestException(response,`${request.url} not found`)
};

const errorHandler = (error, request, response, next) => {

    if(ENV == 'LOCAL'){
        console.error(error)
    }else {

        switch (error.name) {
            case 'CastError':
                return BadRequestException(res,'malformatted id!')
            case 'ValidationError':
                return BadRequestException(res,error.message)
            default:
                return BadRequestException(res,error.message)
        }
    }
    next(error);
}

module.exports = {
    userAuth,
    unknownEndpoint,
    errorHandler
}