import express from 'express'
import TodoController from '../controllers/todo.controller'
import AuthController from '../../../infrastructure/http/controllers/auth.controller'

const router = express.Router()
const todoController = new TodoController()
const authController = new AuthController()
const verifyToken =authController.verifyToken
const googleAuth = authController.getGoogleUrl

// Getting all
router.get('/', (req, res) => {
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