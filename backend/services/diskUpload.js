//MULTER & GRID FS (UPLOAD PART)
const multer = require('multer');
const path = require("path");

//set storage engine with multer
// SET STORAGE ON DISK (LOCAL SERVER)
const diskstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname + '/../' + '/uploads/'));
        // cb(null, '/home/robert.poenaru/PIPELINE/DevWorkspace/NODEJS/elasticServer/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const diskupload = multer({ storage: diskstorage });

module.exports = diskupload;