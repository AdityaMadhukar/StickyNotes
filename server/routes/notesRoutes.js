const express = require("express")
const { authenticator } = require("../middleware/userAuth")
const {getAllNotes, addNote, editNote, deleteNote, userNotes} = require("../controllers/notesController");

const notesRouter = express.Router()

notesRouter.get("/", authenticator, getAllNotes)
notesRouter.post("/addnote", authenticator, addNote);
notesRouter.patch("/editnote", authenticator, editNote);
notesRouter.delete("/deletenote", authenticator, deleteNote);
notesRouter.get("/mynotes", authenticator, userNotes);

module.exports = {
    notesRouter
}