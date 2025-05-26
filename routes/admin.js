var express = require('express');
const { getUserById, uploadProfile } = require('../controllers/userController');
const { adminMiddleware } = require("../middleware/Middleware");
const { adminLogin } = require('../controllers/adminController');
const upload = require("../config/multer");

var router = express.Router();

// http://localhost:9000/api/admin
router.get("/", adminMiddleware, getUserById)

// http://localhost:9000/api/admin/login
router.post("/login", adminLogin)

// http://localhost:9000/api/admin/upload-profile
router.put("/upload-profile", upload.single("image"), adminMiddleware, uploadProfile)


module.exports = router;
