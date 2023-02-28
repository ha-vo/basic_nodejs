import express from 'express'
import homeController from '../controller/homeController.js'
import appRoot from 'app-root-path'
import multer from 'multer'
import path from 'path'
let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3)

const initWebRoute = (app) => {
    router.get('/', homeController.getHome)
    router.get('/detail/user/:id', homeController.getDetail)
    router.post('/addNew', homeController.getAddNew)
    router.post('/deleteUser', homeController.deleteUser)
    router.post('/editUser', homeController.getEditUser)
    router.post('/sucessUpdate', homeController.update)
    router.post('/detail', homeController.getDetail)
    router.get('/upload', homeController.getUpload)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadMultipleFiles(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }

            else {
                // make sure to call next() if all was well
                next();
            }
        })
    }, homeController.handleMultipleUploadFiles)
    return app.use('/', router)
}

export default initWebRoute

