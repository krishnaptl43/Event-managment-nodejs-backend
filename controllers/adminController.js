const User = require("../model/userModel")
const ApiResponse = require("../response")
const Bcrypt = require("../config/hashing")
const JWT = require("../config/jsonwebtoken")

async function adminLogin(req, res) {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email, isAdmin: true })

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


module.exports = {adminLogin }