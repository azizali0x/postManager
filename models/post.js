const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: false,
    },
    likes: Number,
    comment:[{
        name:{
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true,
        },
    }]
})

postSchema.set("toJSON",{
    transform: (doc,obj)=>{
        obj.id = obj._id.toString()

        delete obj._id
        delete obj.__v
    }
})

module.exports = mongoose.model("Post",postSchema)
