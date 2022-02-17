const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const apiRoutes = require('./src/modules/routes/routes')

app.use(cors())
app.use(express.json())
app.use('/', apiRoutes)

const { MongoClient } = require('mongodb');
const req = require('express/lib/request');
const uri = "mongodb+srv://magnifico99:28121999A@cluster0.iscaj.mongodb.net/magnifico99?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
})