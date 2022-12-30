const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.set('toJSON',{
    transform:(doc,obj)=>{
        obj.id = obj._id

        delete obj._id
        delete obj.password
        delete obj.__v
    }
})

module.exports = mongoose.model("User",userSchema)