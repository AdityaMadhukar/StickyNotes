const pool = require("../config/db");
const mysql = pool.promise();
require("dotenv").config();
const salt = 5
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req, res)=>{
    const {name, email, password} = req.body
    bcrypt.hash(password, salt, async function(err, hash) {
        if(err)
            return res.send({message: "Something went wrong", status: 0})
        try
        {
            const query = "SELECT * FROM user WHERE email = ?";
            const [response] = await mysql.query(query, email);
            if(response.length > 0)
            {
                res.send({
                    message: "Email already exists!",
                    status: 0
                })
            }
            else
            {
                const query = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
                const response = await mysql.query(query, [name, email, hash]);
                res.status(200).send("User Registered");
            }
        }
        catch(error)
        {
            res.status(500).send(error);
        }
    });
}

const login = async(req, res)=>{
    const {email, password} = req.body;
    let option = {
        expiresIn: "1d"
    }
    try
    {
        const query = "SELECT * FROM user WHERE email = ?";
        const [[response]] = await mysql.query(query, email);
        if(response)
        {
            let token = jwt.sign({userID: response.id, role: response.role}, process.env.JWT_SECRET_KEY, option);
            bcrypt.compare(password, response.password, function(err, result)
            {
                if(err) return res.send({
                    message: "Something went wrong: " + err,
                    status: 0
                })
                if(result){
                    res.send({
                        message: "Login successful",
                        name: response.name,
                        role: response.role,
                        token: token,
                        status: 200
                    })
                }
                else
                res.send({
                    message: "Incorrect password",
                    status: 0
                })
            });
        }
        else
        {
            res.send({
                message: "User does not exist",
                status: 0
            })
        }
    }
    catch(error)
    {
        res.send({
            message: error.message,
            status: 500
        })
    }
    
}

module.exports = {
    register, login
}