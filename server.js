require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


const todosRouter = require('./routes/todos')
app.use('/todos', todosRouter)

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});