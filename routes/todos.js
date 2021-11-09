const express = require('express')
const router = express.Router()

const Todo = require('../models/todo')

// Getting all
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// // Getting One
router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo)
})

// Creating one
router.post('/', async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
  })
  try {
    const newTodo = await todo.save()
    res.status(201).json(newTodo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// // Updating One
router.patch('/:id', getTodo, async (req, res) => {
  if (req.body.name != null) {
    res.todo.name = req.body.name
  }
  
  try {
    const updatedTodo = await res.todo.save()
    res.json(updatedTodo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// // Deleting One
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove()
    res.json({ message: 'Deleted todo' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTodo(req, res, next) {
  let todo
  try {
    todo = await Todo.findById(req.params.id)
    if (todo == null) {
      return res.status(404).json({ message: 'Cannot find todo' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.todo = todo
  next()
}

module.exports = router