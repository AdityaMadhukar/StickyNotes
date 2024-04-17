const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

function authenticator(req, res, next){
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode)=>{
        if(err)
        return res.send({
            message:  "Invalid token, please login again", err,
            status: 201
        })
        if(decode){
            req.body.userID = decode.userID;
            req.body.role = decode.role;
            next()
        }
        else
        {
            res.send({
                message: "Invalid token, please login again",
                status: 2
            })
        }
    })
}

module.exports = {
    authenticator
}