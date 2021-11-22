import express from 'express'
import TodoController from '../controllers/todo.controller'
import AuthController from '../../../infrastructure/http/controllers/auth.controller'
import AuthService from '../../../application/services/auth.service'
import config from '../../config/db'

const router = express.Router()
const todoController = new TodoController()
const authController = new AuthController()
const authService = new AuthService()
const verifyToken =authController.verifyToken
const googleAuth = authController.googleAuth
var middleware = config.auth === 'google' ? googleAuth: verifyToken
// Getting all
router.get('/', middleware, (req:any, res:any) => {
    todoController.getTodos(req,res)
})

// Getting One
router.get('/:id',  (req, res) => {
  todoController.getTodo(req,res)
})

// Creating one
router.post('/',  (req, res) => {
  todoController.createTodo(req, res)
})

// Updating One
router.put('/:id',  (req, res) => {
 todoController.updateTodo(req,res)
})

// Deleting One
router.delete('/:id',  (req, res) => {
 todoController.deleteTodo(req,res)
})

export default router