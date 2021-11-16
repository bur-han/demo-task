import express from 'express'
import TodoService from '../../../application/services/todos.service'
import AuthService from '../../../application/services/auth.service'

const router = express.Router()
const todoService = new TodoService()
const authService = new AuthService()
const verifyToken =authService.verifyToken

// Getting all
router.get('/', verifyToken, (req, res) => {
    todoService.getTodos(req,res)
})

// Getting One
router.get('/:id', verifyToken, (req, res) => {
  todoService.getTodo(req,res)
})

// Creating one
router.post('/', verifyToken, (req, res) => {
  todoService.createTodo(req, res)
})

// Updating One
router.put('/:id', verifyToken, (req, res) => {
 todoService.updateTodo(req,res)
})

// Deleting One
router.delete('/:id', verifyToken, (req, res) => {
 todoService.deleteTodo(req,res)
})


export default router