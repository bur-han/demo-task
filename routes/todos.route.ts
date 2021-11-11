import express from 'express'
import TodoService from '../services/todos.service'
const router = express.Router()
const todo = new TodoService()
const Todo = require('../models/todo.model')

// Getting all
router.get('/', async (req, res) => {
  try {
    todo.getTodos()
    .then(todos => {
      res.json(todos)
    })
    
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// // Getting One
router.get('/:id', getTodo, (req, res) => {
  res.json((res as any).todo)
})

// Creating one
router.post('/', async (req, res) => {
  if(process.env.ORM === 'Mongoose')
{
  let Todo = todo.createTodo(req.body)
  try {
    const newTodo = await Todo.save()
    res.status(201).json(newTodo)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}
if(process.env.ORM === 'Sequelize')
{
  todo.createTodo(req.body)
  .then(async (todo:any) => {
    try {
      const newTodo = await todo.save()
      res.status(201).json(newTodo)
    } catch (err: any) {
      res.status(400).json({ message: err.message })
    }
  })
 
}
 
})

// // Updating One
router.patch('/:id', getTodo, async (req, res) => {
  if (req.body.name != null) {
    (res as any).todo.name = req.body.name
  }
  try {
    const updatedTodo = await (res as any).todo.save()
    res.json(updatedTodo)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// // Deleting One
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await (res as any).todo.remove()
    res.json({ message: 'Deleted todo' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

async function getTodo(req: any, res: any, next: any) {
  let todo
  try {
    todo = await Todo.findById(req.params.id)
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' })
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }

  res.todo = todo
  next()
}

module.exports = router