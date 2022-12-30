const { mongo } = require("mongoose")
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')


const getUser = async (token) => {
    if(token != null){
        const userInfo = jwt.decode(token);

        const user = await userModel.findOne({email: userInfo.email});
        return user;
    }
    return null
};


const NotFoundRequestException = (res,message) =>{
    return res.status(404).json({
        error: message
    })
} 

const BadRequestException = (res,message)=>{
    return res.status(400).json({
        error: message
    })
}

const ForbiddenRequestException =(res,message)=>{
    return res.status(403).json({
        error: message
    })
}

const ConflictRequestException = (res,message)=>{
    return res.status(409).json({
        error: message
    })
}



module.exports = {
    getUser,
    NotFoundRequestException,
    BadRequestException,
    ForbiddenRequestException,
    ConflictRequestException
}