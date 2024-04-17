const pool = require("../config/db");
const mysql = pool.promise();
require("dotenv").config();

const getLog = async (req, res) => {
    try{
        const query = "SELECT log.id, log.description, log.timestamp, user.name FROM log JOIN user ON log.userID = user.id ORDER BY log.timestamp DESC";
        const [log] = await mysql.query(query);
        res.status(200).send(log);
    }
    catch(error){
        res.status(500).send(error);
    }
}

const getAllUsers = async (req, res) => {
    try{
        const query = "SELECT id, name, role FROM user";
        const [users] = await mysql.query(query);
        res.status(200).json(users);
    }
    catch(error){
        console.error("Error Fetching: ", error);
        res.status(500).send("Error Fetching");
    }
}

const promoteUser = async (req, res) => {
    const {id, userID} = req.body;

    try{
        const query = "UPDATE user SET role = 'admin' WHERE id = ?";
        const response = await mysql.query(query, id);
        const logQuery = "INSERT INTO log (description, userID) VALUES ('Promoted a User',?)";
        const logResponse = await mysql.query(logQuery, userID);
        res.status(200).send("User Promoted");
    }
    catch(error){
        res.status(500).send(error);
    }
}


module.exports = {getLog, getAllUsers, promoteUser};