const express = require('express')
const app = express()
const PORT = 4000
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser');

dotenv.config() 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
    })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use('/', routesUrls)
app.listen(PORT, () => console.log(`server is running on ${PORT}`))