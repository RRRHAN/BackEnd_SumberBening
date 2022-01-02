const jwt = require('jsonwebtoken')
const config = require("./config.json")

const auth = (req, res, next) => {
    let headers = req.headers.authorization,
        query = req.query,
        token = null

    if (headers != null) {
        token = headers.split(' ')[1]
    } else if (query != null) {
        token = query.token
    }
    if (token != null) {
        let jwtHeader = {
            algorithm: 'HS256'
        }
        jwt.verify(token, config.secretKey, jwtHeader, err => {
            if (err) {
                res.json({
                    massage: err.message,
                    logged: false
                })
            } else {
                next()
            }
        })
    } else if (token == null) {
        res.json({
            massage: 'unauthorized',
            logged: false
        })
    }
}
module.exports = auth