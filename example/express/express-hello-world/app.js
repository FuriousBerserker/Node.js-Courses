const express = require('express')
const app = express()

app.set('port', process.env.port || 3000)

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next()
})

app.use((req, res, next) => {
    if (req.query.api_key) {
        next()
    } else {
        res.status(401).send({msg: 'Not authorized'})
    }
})

app.get('/', (req, res) => {
    res.send('hello world')
    res.end('hello world')
})

app.get('/accounts', (req, res, next) => {
    console.log('accounts inline middleware')
    next(new Error('oooops'))
}, (req, res) => {
    res.send({msg: 'accounts'})
})

app.get('/transactions', (req, res) => {
    res.send({msg: 'transactions'})
})

app.use((error, req, res, next) => {
    res.status(500).send(error)
})
app.haha = "haha"
console.log(app.haha)
app.listen(3000)
