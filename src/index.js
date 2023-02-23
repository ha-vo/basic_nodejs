
require('dotenv').config()
const express = require('express')
const configViewEngine = require('./configs/viewEnginer.js')
const path = require('path')
const app = express()
const port = process.env.PORT

configViewEngine(app)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})
