const { diskStorage } = require('multer');
const multer = require('multer');

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage });

module.exports = upload;