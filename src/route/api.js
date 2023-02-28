import express from 'express'
import apiController from '../controller/apiController.js'

let router = express.Router()

const initApi = (app) => {
    router.get('/getUser', apiController.getData)
    router.post('/postUser', apiController.postData)
    app.use('/api/v1', router)
}

export default initApi