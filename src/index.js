
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'
import { configViewEngine } from './configs/viewEnginer.js'
import path from 'path'
import initWebRoute from './route/web.js'
import connection from './configs/connectDB.js'
import initApi from './route/api.js'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

configViewEngine(app)
initWebRoute(app)
initApi(app)

app.listen(port, () => {
    console.log(`web running in http://localhost:${port}`)
})

