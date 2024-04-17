const express = require("express")
const {getAllUsers, promoteUser, getLog } = require("../controllers/adminController");
const { authenticator } = require("../middleware/adminAuth")

const adminRouter = express.Router()
adminRouter.get("/log", authenticator, getLog);
adminRouter.get("/users", authenticator, getAllUsers);
adminRouter.patch("/promoteuser", authenticator, promoteUser);

module.exports = {
    adminRouter
}