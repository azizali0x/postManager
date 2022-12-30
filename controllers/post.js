const POST= require('express').Router()
const Model = require('../models/post')
const { isValidObjectId } = require('mongoose')
const {NotFoundRequestException,BadRequestException,ForbiddenRequestException,getUser} = require('../utils/helper')

POST.post('/',async(req,res)=>{

    const user = await getUser(req.get("authorization"));

    const {
        title,
        content,
    } = req.body

    if(title == null){
        return BadRequestException(res,'title cannot be empty!')
    }
    if(content == null){
        return BadRequestException(res,'content cannot be empty')
    }

    const post = new Model()

    if(user != null){
        post.title = title;
        post.content = content;
        post.user = user.id

        await post.save()
    }else {
        post.title = title;
        post.content = content;
        await post.save()
    }

    return res.status(201).json(post)
})

POST.get('/', async(req,res)=>{

    const user = await getUser(req.get("authorization"));

    if(user != null){

        const posts = await Model.find({user: user.id})

        return res.status(200).json(posts)
    }

    const posts = await Model.find({user:{$exists:false}})

    return res.status(200).json(posts)

})

POST.get('/:id', async(req,res)=>{

    const user = await getUser(req.get("authorization"));

    const id = req.params.id

    if(!isValidObjectId(id)){
        return BadRequestException(res,'invalid post id!')
    }
    const post = await Model.findById(id)
    if(post == null){
        return NotFoundRequestException(res,'post not found!')
    }
    if (post.user != null){

        if(user != null){
            const isUser = post.user ==  user.id? true : false;

            if(isUser){
                return res.status(200).json(post)
            }
        }
        return ForbiddenRequestException(res,'action forbidden!')
    }
    return res.status(200).json(post)
})

POST.patch('/:id',async(req,res)=>{
    const user = await getUser(req.get("authorization"));
    const id = req.params.id

    const {content, title} = req.body

    if(!isValidObjectId(id)){
        return BadRequestException(res,'invalid post id!')
    }
    const post = await Model.findById(id)

    if(post == null){
        return NotFoundRequestException(res,'post not found!')
    }

    if( post.user != null){
        if(user != null){
            const isUser = post.user ==  user.id? true : false;

            if(isUser){

                post.content = content
                post.title = title

                await post.save()
                return res.status(200).json(post)
            }
        }
        return ForbiddenRequestException(res,'action forbidden!')
    }

    post.content = content
    post.title = title

    await post.save()
    return res.status(200).json(post)
})

POST.delete('/:id',async(req,res)=>{
    const user = await getUser(req.get("authorization"));
    const id = req.params.id


    if(!isValidObjectId(id)){
        return BadRequestException(res,'invalid post id!')
    }
    const post = await Model.findById(id)

    if(post == null){
        return NotFoundRequestException(res,'post not found!')
    }

    if( post.user != null){
        if(user != null){
            const isUser = post.user ==  user.id? true : false;

            if(isUser){

                await post.delete()

                return res.status(200).json(post)
            }
        }
        return ForbiddenRequestException(res,'action forbidden!')
    }

    await post.delete()
    return res.status(200).json(post)
})

// POST.post('/:id/comment',async(req,res)=>{
//     const id = req.params.id

//     if(!isValidObjectId(id)){
//         return BadRequestException(res,'invalid post id!')
//     }
//     const post = await Model.findById(id)

//     if(post == null){
//         return notFoundException(res,'post not found!')
//     }
// })

// POST.post('/:id/like',async(req,res)=>{
//     const id = req.params.id

//     if(!isValidObjectId(id)){
//         return BadRequestException(res,'invalid post id!')
//     }
//     const post = await Model.findById(id)

//     if(post == null){
//         return notFoundException(res,'post not found!')
//     }

// })


module.exports = POST