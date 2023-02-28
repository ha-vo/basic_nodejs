import pool from "../configs/connectDB.js"

const getData = async (req, res) => {
    let [rows, fields] = await pool.execute('SELECT * FROM USER')
    return res.status(200).json({
        message: 200,
        data: rows
    })
}

const postData = async (req, res) => {
    let rows = req.body
    return res.status(200).json({
        message: 200,
        data: rows
    })
}

export default {
    getData, postData
}