const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express()
const DB = require('./db/connectdb')
const dataRouter = require('./router/userRouter')
const bodyParser = require('body-parser')
app.use(cors({
    origin:'http://localhost:1010'
}))

app.use (bodyParser.json())

app.use('/api/auth',dataRouter)
DB()
app.listen(2323,()=>{
    console.log('server 2323 is running')
})

