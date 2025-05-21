const { verifyToken } = require("../config/jsonwebtoken");
const userModel = require("../model/userModel");
const ApiResponse = require("../response");

class Middleware {
    async userMiddleware(req, res, next) {
        try {
            let { status, data, msg } = await verifyToken(req)
            if (status) {
                let user = await userModel.findOne({ _id: data._id, isAdmin: false })
                if (!user) {
                    return res.json(new ApiResponse(false, null, "Authentication Failed"))
                }
                req.data = data
                next()
            } else {
                return res.json(new ApiResponse(false, null, msg))
            }
        } catch (error) {
            return res.json(new ApiResponse(false, null, error.message))
        }
    }

    async adminMiddleware(req, res, next) {
        try {
            let { status, data, msg } = await verifyToken(req)
            if (status) {
                let user = await userModel.findOne({ _id: data._id, isAdmin: true })
                if (!user) {
                    return res.json(new ApiResponse(false, null, "Authentication Failed"))
                }
                req.data = data
                next()
            } else {
                return res.json(new ApiResponse(false, null, msg))
            }
        } catch (error) {
            return res.json(new ApiResponse(false, null, error.message))
        }
    }
}

module.exports = new Middleware();