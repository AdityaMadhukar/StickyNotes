const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser")
const {userRouter} = require("./routes/userRoutes");
const {notesRouter} = require("./routes/notesRoutes");
const {adminRouter} = require("./routes/adminRoutes");
const {connection} = require("./config/db");
const pool = require('./config/db');
const port = process.env.PORT||5000;

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully!');
        connection.release();
    }
});

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/notes", notesRouter);

app.get("/", (req, res)=>{
    res.send({
        message: "API is working"
    })
});

app.listen(port, async()=>{
    console.log("Server is running on port", port);
})
