const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const config = require('../config.json')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post('/', async(req, res) => {
    const { username, password } = req.body
    let result = null
    config.user.forEach(element => {
        if (element.username == username) {
            if (element.password == password) {
                result = element
            }
        }
    });
    if (result == null) {
        // username atau password salah
        res.json({
            message: 'invalid username or password',
            logged: false
        })
    } else if (result != null) {
        // berhasil login
        let jwtHeader = {
            algorithm: 'HS256',
            expiresIn: '7d'
        }
        let payload = {
            data: result
        }

        let token = jwt.sign(payload, config.secretKey, jwtHeader)

        res.json({
            data: result,
            logged: true,
            token: token
        })
    }
})


module.exports = app