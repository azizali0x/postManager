const express = require('express')
const {userAuth,unknownEndpoint, errorHandler} = require('./utils/middleware')
const USER = require('./controllers/user')
const POST = require('./controllers/post')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const {MONGO_URI} = require('./utils/config')


const app = express()

mongoose.connect(MONGO_URI)
    .then(() => {
        console.info("connected to MongoDB");
    })
    .catch((error) => {
        console.error("error connection to MongoDB:", error.message);
    });

app.use(morgan(":method :url :req[body] :status :res[body] - :response-time ms"));

app.use(cors())
app.use(express.json())


app.use('/api/posts',POST)

app.use('/api/user',USER)


app.use('/api/docs',async(req,res)=>{
    res.send(
        `
        <h2>Welcome to postManager</h2>

        Here you can manage posts either publicly or privately.<br>
        We've adhered to RESTFUL API STANDARDS.<br>

        <p>NB: You can create posts either publicly or privately and either private post is unique to a user.</p>

        <p><em>PUBLIC POSTS</em>: Authentication is not required. make a request and get access to all data.</p>

        <p><em>PRIVATE POSTS</em>: Authentication is required. provide an <code>authorization</code> token when accessing posts privately.</p>

        <h3>POSTS endpoint <code>/api/posts</code></h3>
        <dl>

        <dt>CREATE A POST <code>{ POST => /api/posts}</code></dt>
        <dd> 
        body params =>
            {
                title: "title of post",
                content: "content of post"
            }
        </dd>        <br>


        <dt>GET ALL POSTS <code>{GET => /api/posts}</code></dt>
        <dd>
        <br>
        </dd>

        <dt>GET A POST <code>{GET => /api/posts/:ID}</code></dt>
        <dd>
        <br>
        </dd>


        <dt>UPDATE A POST <code>{PATCH => /api/posts/:id}</code></dt>
        <dd>
        body params => {
            title: 'title to be changed',
            content: 'content to be changed',
        }
        </dd>        <br>

        <dt>DELETE A POST <code>{DELETE => /api/posts/:id }</code> </dt>
        <dd>
        <br>
        </dd>
        </dl>
        
        <h3>SIGN UP endpoint <code>/api/user/signup</code></h3>
        <dl>
        <dt>CREATE USER <code>{POST => /api/user/signup }</code> </dt>
        <dd> body params => {
            email: example@mail.com,
            password: password,
            name: John Doe
        }<br> 
        response => {
            user: {
                name: John Doe,
                email; example@mail.com
                id: eiojejl3oinm,vmldmkddkl,
            }
            token: kjldlflnio3lkvnriojej38932poiw0e9ujfokljsdlkjal
        }<br>

        NB: USE <code>Authorization: token</code> if you want to use private posts.
        </dd>
        <dl>

        <h3>SIGN IN endpoint <code>/api/user/login</code></h3>
        <dl>
        <dt>SIGN IN <code>{POST => /api/user/login }</code></dt>
        <dd> body params => {
            email: example@mail.com,
            password: password,
        }<br>
        response => {
            user: {
                name: John Doe,
                email; example@mail.com
                id: eiojejl3oinm,vmldmkddkl,
            }
            token: kjldlflnio3lkvnriojej38932poiw0e9ujfokljsdlkjal
        }
        </dd>
        </dl>
        `)
})


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app