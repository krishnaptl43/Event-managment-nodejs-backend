var express = require('express');
const { userRegister, userLogin, getUserById, uploadProfile } = require('../controllers/userController');
const { userMiddleware } = require("../middleware/Middleware");
const upload = require('../config/multer');

var router = express.Router();

// http://localhost:9000/api/user
router.get("/", userMiddleware, getUserById)

// http://localhost:9000/api/user/register
router.post("/register", userRegister)

// http://localhost:9000/api/user/login
router.post("/login", userLogin)

// http://localhost:9000/api/user/upload-profile
router.put("/upload-profile", upload.single("image"), userMiddleware, uploadProfile)


module.exports = router;
