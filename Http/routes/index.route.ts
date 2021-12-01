import todosRouter from './todos.route'
import usersRouter from './users.route'
import authRouter from './auth.route'
import express from 'express'
const routes = express();

routes.use('/todos', todosRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)

export default routes