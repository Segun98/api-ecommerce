const multer = require('multer')
const path = require('path')
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

//multer config
const storage = multer.memoryStorage();
const multerUploads = multer({
    storage
}).single("file");

//parse the file into a cloudinary readable strinng
function dataUri(req) {
    const result = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer)
    return result
}

module.exports.multerUploads = multerUploads
module.exports.dataUri = dataUri