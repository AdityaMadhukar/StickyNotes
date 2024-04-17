const pool = require("../config/db");
const mysql = pool.promise();
require("dotenv").config();


const getAllNotes = async(req, res) => {
        const {role} = req.body;
        try {
            let query="";
            if(role=="admin"){
                query = "SELECT notes.id, notes.note, notes.status, user.name FROM notes JOIN user ON notes.userID = user.id ORDER BY notes.id DESC LIMIT 10";
            }
            else{
                query = "SELECT notes.note, user.name FROM notes JOIN user ON notes.userID = user.id WHERE status = 'public' ORDER BY notes.id DESC LIMIT 10";
            }
            const [notes] = await mysql.query(query);
            res.status(200).json(notes);
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
}

const addNote = async(req, res)=>{
    const {userID, note, status} = req.body;
    try {
        const query = "INSERT INTO notes (note, status, userID) VALUES (?,?,?)";
        const [response] = await mysql.query(query, [note, status, userID])
        const logQuery = "INSERT INTO log (description, userID) VALUES ('Added a note',?)";
        const logResponse = await mysql.query(logQuery, userID);
        res.status(200).send("Note added");
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
}

const editNote = async(req, res)=>{
    const {id, note, status, userID, role} = req.body;
    try {
        let query="";
        if(role=="admin"){
            query = "UPDATE notes SET note = ?, status = ? WHERE id = ?";
        }
        else{
            query = "UPDATE notes SET note = ?, status = ? WHERE id = ? AND userID = ?";
        }
        const response = await mysql.query(query, [note, status, id, userID]);
        const logQuery = "INSERT INTO log (description, userID) VALUES ('Edited a note',?)";
        const logResponse = await mysql.query(logQuery, userID);
        res.status(200).send("Note updated");
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
}

const deleteNote = async(req, res)=>{
    const {id, userID, role}= req.body;
    try {
        let query="";
        if(role=="admin"){
            query = "DELETE FROM notes WHERE id = ?";
        }
        else{
            query = "DELETE FROM notes WHERE id = ? AND userID = ?";
        }
        const response = await mysql.query(query, [id, userID]);
        const logQuery = "INSERT INTO log (description, userID) VALUES ('Deleted a note', ?)";
        const logResponse = await mysql.query(logQuery, userID);
        res.status(200).send("Note deleted");
    } catch (error) {
        res.status(500).send(error);
    }
}

const userNotes = async(req, res)=>{
    const {userID} = req.body;
    try{
        const query = "SELECT * FROM notes WHERE userID = ? ORDER BY id DESC";
        const [response] = await mysql.query(query, userID);
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getAllNotes, addNote, editNote, deleteNote, userNotes
}