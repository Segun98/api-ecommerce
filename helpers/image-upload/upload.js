const router = require("express").Router()
const {
    dataUri,
    multerUploads
} = require("./multer")
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


router.post('/upload', multerUploads, (req, res) => {
    if (!req.file) {
        return null
    }
    const file = dataUri(req).content;
    const data = {
        image: file,
    }
    cloudinary.uploader.upload(data.image, {
            quality: 30
        })
        .then(result => {
            res.send(result.secure_url)
        })
        .catch(err => res.send(err))
});

module.exports = router