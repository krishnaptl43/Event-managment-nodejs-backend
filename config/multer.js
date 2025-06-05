const { diskStorage } = require('multer');
const fs = require('fs')
const path = require('path');

const storage = diskStorage({
    destination: (req, file, cb) => {

        if (file.fieldname === "thumbnail") {
            let dir = "uploads/event"

            if (!fs.existsSync(dir)) {
                fs.mkdirSync("uploads/event", { recursive: true })
            }

            cb(null, "uploads/event");
        }

        if (file.fieldname === "image") {
            cb(null, "uploads/profile");
        }

    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + "-" + file.fieldname + ext)
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