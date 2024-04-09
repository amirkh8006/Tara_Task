
const config = require('../config/config')


function adminAuthentication(req, res, next) {
    if (req.header('apiKey') === config.adminApiKey) {
        next()
    } else {
        res.status(403).json({
            "message": "unauthorized"
        })
    }
}


function userAuthentication(req, res, next) {
    if (req.header('apiKey') === config.userApiKey) {
        next()
    } else {
        res.status(403).json({
            "message": "unauthorized"
        })
    }
}

module.exports = {
    adminAuthentication,
    userAuthentication
}
