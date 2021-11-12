require('dotenv').config()
import express from 'express'

const app = express();
app.use(express.json())

import todosRouter from './routes/todos.route'
app.use('/todos', todosRouter)

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});