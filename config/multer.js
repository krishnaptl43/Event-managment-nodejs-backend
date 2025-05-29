const { diskStorage } = require('multer');
const path = require('path');

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

function profileFilter(req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
}

module.exports = { storage, profileFilter };