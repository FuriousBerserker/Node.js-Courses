const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const errorhandler = require("errorhandler")
const routes = require("./routes")

let store = {}
store.posts = []

let app = express()

// middlewares
app.use((req, res, next) => {
    req.store = store
    next()
})
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

// routes for post
app.get('/posts', (req, res) => {
    routes.posts.getPosts(req, res)
})

app.post('/posts', (req, res) => {
    routes.posts.addPost(req, res)
})

app.put('/posts/:postId', (req, res) => {
    routes.posts.updatePost(req, res)
})

app.delete('/posts/:postId', (req, res) => {
    routes.posts.removePost(req, res)
})

// routes for comments
app.get('/posts/:postId/comments', (req, res) => {
    routes.comments.getComments(req, res)
})

app.post('/posts/:postId/comments', (req, res) => {
    routes.comments.addComment(req, res)
})

app.put('/posts/:postId/comments/:commentId', (req, res) => {
    routes.comments.updateComment(req, res)
})

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
    routes.comments.removeComment(req, res)
})

app.listen(3000)
