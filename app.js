const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const routes = require("./routes/index.routes")
const cookieParser = require("cookie-parser")
const cors = require('cors');
const errorHendler = require('./middleware/ErrorHandlingMiddleware');

const PORT = config.get("port")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(routes)

app.use(errorHendler)
async function start(){
    try {
        await mongoose.connect(config.get("dbUri"))
        app.listen(PORT,() =>{
            console.log(`Server ${PORT}-portda ishga tushdi`);
        })
    } catch (error) {
        console.log(error.message);
    }
}


start()

