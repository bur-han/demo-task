import express from 'express'
import TodoService from '../services/todos.service'
import TodoModel from '../models/todo.model'

const router = express.Router()
const todoService = new TodoService()

// Getting all
router.get('/', async (req, res) => {
    todoService.getTodos(req,res)
})

// Getting One
router.get('/:id', getTodo, (req, res) => {
  res.json((res as any).todo)
})

// Creating one
router.post('/', async (req, res) => {
  todoService.createTodo(req, res)
})

// Updating One
router.patch('/:id', getTodo, async (req, res) => {
 todoService.updateTodo(req,res)
})

// Deleting One
router.delete('/:id', getTodo, async (req, res) => {
 todoService.deleteTodo(req,res)
})

//middleware function
async function getTodo(req: any, res: any, next: any) {
  let todo
  try {
    todo = await TodoModel.findById(req.params.id)
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' })
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }

  res.todo = todo
  next()
}

export default router