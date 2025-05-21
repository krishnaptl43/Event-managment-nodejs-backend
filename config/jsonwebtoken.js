const jwt = require('jsonwebtoken')
require('dotenv').config();
const secret = process.env.TOKEN_SECRET

class JWT {
    generateToken(data) {
        return jwt.sign(data, secret, { expiresIn: "1d" })
    }

    verifyToken(req) {
        return new Promise(async (resolve, reject) => {
            let headers = req && req.headers;
            let token = headers && headers['authorization']?.split(" ")[1]
 
            if (!token) {
                resolve({ status: false, msg: "token Not Found" })
            }

            try {
                jwt.verify(token, secret, (err, data) => {
                    if (err) {
                        resolve({ status: false, msg: "invalid or Expire Token" })
                    }

                    resolve({ status: true, data })
                })
            } catch (error) {
                reject({ status: false, msg: error.message })
            }
        })
    }
}

module.exports = new JWT();