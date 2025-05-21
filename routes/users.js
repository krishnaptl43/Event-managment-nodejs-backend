var express = require('express');
const { userRegister, userLogin, getUserById } = require('../controllers/userController');
const { userMiddleware } = require("../middleware/Middleware");

var router = express.Router();

// http://localhost:9000/api/user
router.get("/", userMiddleware, getUserById)

// http://localhost:9000/api/user/register
router.post("/register", userRegister)

// http://localhost:9000/api/user/login
router.post("/login", userLogin)


module.exports = router;
