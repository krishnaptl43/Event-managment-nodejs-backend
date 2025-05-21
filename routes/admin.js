var express = require('express');
const { getUserById } = require('../controllers/userController');
const { adminMiddleware } = require("../middleware/Middleware");
const { adminLogin } = require('../controllers/adminController');

var router = express.Router();

// http://localhost:9000/api/admin
router.get("/", adminMiddleware, getUserById)

// http://localhost:9000/api/admin/login
router.post("/login", adminLogin)


module.exports = router;
