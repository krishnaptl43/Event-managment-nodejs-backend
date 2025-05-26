const User = require("../model/userModel")
const ApiResponse = require("../response")
const Bcrypt = require("../config/hashing")
const JWT = require("../config/jsonwebtoken")
const transporter = require("../config/nodemailer");
const { trusted } = require("mongoose");
require("dotenv").config();

async function userRegister(req, res) {
    const { username, email, password } = req.body
    try {
        let hashPassword = await Bcrypt.hashPassword(password)

        let user = await User.create({ username, email, password: hashPassword })

        if (!user) {
            return res.json(new ApiResponse(false, null, "user register failed"))
        }

        let mailOption = {
            from: process.env.ADMIN_MAIL_ID,
            to: user.email,
            subject: "For Registration",
            html: `<h1>Dear ${user.username}</h1>
             <h2>Thank You For Registration</h2>`,
        }

        transporter.sendMail(mailOption, (err) => {

            if (err) {
                return res.json(new ApiResponse(true, user, "user registered Mail Not Sent"))
            }

            return res.json(new ApiResponse(true, user, "user registered And WellCome Mail Sent Successfully"))

        })

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

async function uploadProfile(req, res) {

    let url = `${req.protocol}://${req.host}/${req.file.path?.replaceAll("\\", "/")}`
    try {

        let user = await User.findByIdAndUpdate(req.data._id, { image: url }, { new: true });

        if (!user) {
            return res.json(new ApiResponse(false, null, "uploads failed"))
        }
        return res.json(new ApiResponse(true, user, "profile Upload Successfully"))

    } catch (error) {
        return res.json(new ApiResponse(false, error, "uploads failed"));
    }

}


module.exports = { userRegister, userLogin, getUserById, uploadProfile }