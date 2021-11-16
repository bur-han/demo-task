import todosRouter from './todos.route'
import usersRouter from './users.route'
import authRouter from './auth.route'
import express from 'express'

const app = express();
app.use('/todos', todosRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

export default app