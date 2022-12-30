const USER = require('express').Router()
const Model = require('../models/user')
const {SECRET, JWT_EXPIRY} = require('../utils/config')
const {userAuth} = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const bcrypt = require('bcrypt')
const {NotFoundRequestException,BadRequestException,ForbiddenRequestException, ConflictRequestException} = require('../utils/helper')




USER.post('/signup',async(req,res)=>{
    const {
        name,
        email,
        password
    } = req.body;

    if(name == null){
        return BadRequestException(res,'name cannot be empty!')
    }
    if(email == null){
        return BadRequestException(res,'email cannot be empty!')

    }
    if(password == null){
        return BadRequestException(res,'password is required!')
    }

    const existingUser = await Model.findOne({email: email})


    if(existingUser != null){
        return res.status(401).json({
            error: "email is already available!"
        })
    }
    const passwordHash = await bcrypt.hash(password,10)

    const user = new Model({
        email,
        name,
        password: passwordHash
    })

    await user.save()

    const token = jwt.sign({email:user.email}, SECRET, {
        expiresIn: JWT_EXPIRY
    })

    return await res.status(200).json({user, token: token})



})

USER.post('/login',async(req,res)=>{
    const {
        email,
        password
    } = req.body;

    if(email == null){
        return BadRequestException(res,'email cannot be empty!')

    }
    if(password == null){
        return BadRequestException(res,'password is required!')
    }

    const user = await Model.findOne({email: email})

    if(user == null){
        return NotFoundRequestException(res, 'user not found!')
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if(!verifyPassword){
        return BadRequestException(res,'password is invalid!')
    }

    const token = jwt.sign({email:user.email}, SECRET, {
        expiresIn: JWT_EXPIRY
    })

    return await res.status(200).json({user, token: token})

})

USER.get('/:id',userAuth,async(req,res)=>{
    const id = req.params.id

    if(!isValidObjectId(id)){
        return BadRequestException(res,'invalid user id!')
    }

    const user = await Model.findById(id)

    if(user == null){
        return res.status(404).json({
            error: 'user not found!'
        })
    }

    if(user.email != req.email){
        return ForbiddenRequestException(res,'action forbidden!')
    }

    return res.status(200).json(user)
})

USER.delete('/:id',userAuth,async(req,res)=>{
    const id = req.params.id

    if(!isValidObjectId(id)){
        return BadRequestException(res,'invalid user id!')
    }

    const user = await Model.findById(id)

    if(user == null){
        return res.status(404).json({
            error: 'user not found!'
        })
    }

    console.log(user.email, req.email)

    if(user.email != req.email){
        return ForbiddenRequestException(res,'action forbidden!')
    }

    return res.status(200).json({
        message: 'user deleted!'
    })
})

USER.patch('/:id',userAuth,async(req,res)=>{
    const id = req.params.id
    const {email,password,name} = req.body


    if(!isValidObjectId(id)){
        return BadRequestException(res,'invalid user id!')
    }

    const existingUser = await Model.findOne({email: email})


    if(existingUser != null){
        return ConflictRequestException(res,'email already exists!')
    }


    const user = await Model.findById(id)

    if(user != null){
        if(user.email != req.email){
            return ForbiddenRequestException(res,'action forbidden!')
        }

    
        const x = await Model.findOneAndUpdate({email:user.email },{
            email: email,
            password: password,
            name: name
        })
    
        return res.status(200).json(x)
    }

    return NotFoundRequestException(res, 'user not found!')    
})

module.exports = USER