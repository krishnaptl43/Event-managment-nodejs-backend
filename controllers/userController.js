const User = require("../model/userModel")
const ApiResponse = require("../response")
const Bcrypt = require("../config/hashing")
const JWT = require("../config/jsonwebtoken")

async function userRegister(req, res) {
    const { username, email, password } = req.body
    try {
        let hashPassword = await Bcrypt.hashPassword(password)

        let user = await User.create({ username, email, password: hashPassword })

        if (!user) {
            return res.json(new ApiResponse(false, null, "user register failed"))
        }
        return res.json(new ApiResponse(true, user, "user registered"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "user register failed"));
    }
}

async function userLogin(req, res) {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email, isAdmin: false })

        if (!user) {
            return res.json(new ApiResponse(false, null, "User Not Found"))
        }

        user = user.toObject()

        let isMatch = await Bcrypt.comparePassword(password, user.password)

        if (!isMatch) {
            return res.json(new ApiResponse(false, null, "Password Invalid"))
        }

        let token = JWT.generateToken(user);
        user.token = token
        return res.json(new ApiResponse(true, user, "User Login Success"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "Error"))
    }
}

async function getUserById(req, res) {
    try {
        let users = await User.findById(req.data._id)
        if (!users) {
            return res.json(new ApiResponse(false, null, "users Not Found"))
        }
        return res.json(new ApiResponse(true, users, "success"))
    } catch (error) {
        return res.json(new ApiResponse(false, error, "server Error"))
    }
}


module.exports = { userRegister, userLogin, getUserById }