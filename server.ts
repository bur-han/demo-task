require('dotenv').config()
// const express = require('express');
import express from 'express'
const app = express();
const db = require('./config/database')
app.use(express.json())

if(process.env.ORM === 'Sequelize')
{
   
      // Test DB
    db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err: any) => console.log('Error: ' + err))
}


if(process.env.ORM === 'Mongoose')
{

db.on('error', (error: any) => console.error(error))
db.once('open', () => console.log('Connected to database'))
}



const todosRouter = require('./routes/todos.route')
app.use('/todos', todosRouter)

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});