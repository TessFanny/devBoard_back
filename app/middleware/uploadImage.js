
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'app/images')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '_' + file.originalname)
    }
})
const upload = multer({ storage, storage})

module.exports = upload; 