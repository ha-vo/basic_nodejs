import pool from "../configs/connectDB.js"
import multer from "multer"

const getHome = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM USER')
    return res.render('index', { userData: rows })
}

const getDetail = async (req, res) => {
    let id = req.body.id
    let [rows, fields] = await pool.execute(`SELECT * FROM USER WHERE id = ?`, [id])
    return res.render('detail', { userData: rows[0] })
}

const getAddNew = async (req, res) => {
    let { id, first_name, last_name, phone, email } = req.body
    await pool.execute(`INSERT INTO USER(id,first_name,last_name,phone,email) VALUES(?,?,?,?,?)`, [id, first_name, last_name, phone, email])
    res.redirect('/')
}

const deleteUser = async (req, res) => {
    let id = req.body.id
    await pool.execute(`DELETE FROM USER WHERE id = ?`, [id])
    res.redirect('/')
}

const getEditUser = async (req, res) => {
    let id = req.body.id
    let [row, fields] = await pool.execute(`SELECT * FROM USER WHERE USER.id =?`, [id])
    res.render('update', { userData: row[0] })
}

const update = async (req, res) => {
    let { id, first_name, last_name, phone, email } = req.body
    await pool.execute(`UPDATE USER SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE id = ?`,
        [first_name, last_name, phone, email, id])
    res.redirect('/')
}

const getUpload = (req, res) => {
    res.render('upload')
}

const upload = multer().single('profile_pic')

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            console.log('fileValidationError')
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            console.log('!file')
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        console.log(req.file.filename)
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    })
}

const uploadMultiple = multer().array('multiple_images')
let handleMultipleUploadFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    let len = req.files.length
    let result = 'You have uploaded this images:'
    for (let i = 0; i < len; i++) {
        console.log(req.files[i].filename)
        result += `<br/><img src="/img/${req.files[i].filename}" width="500"`
    }
    result += '<a href="/upload">Upload another image</a>'
    res.send(result)
}

export default {
    getHome, getDetail, getAddNew, deleteUser, getEditUser, update, getUpload, handleUploadFile, handleMultipleUploadFiles
}


