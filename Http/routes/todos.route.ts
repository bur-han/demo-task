import express from 'express';
import TodoController from '../controllers/todo.controller';
import Authentication from '../Middleware/auth';

const router = express.Router();

// Getting all
router.get('/', Authentication.authenticate, (req: any, res: any) => {
  TodoController.getTodos(req, res);
});

// Getting One
router.get('/:id', (req, res) => {
  TodoController.getTodo(req, res);
});

// Creating one
router.post('/', (req, res) => {
  TodoController.createTodo(req, res);
});

// Updating One
router.put('/:id', (req, res) => {
  TodoController.updateTodo(req, res);
});

// Deleting One
router.delete('/:id', (req, res) => {
  TodoController.deleteTodo(req, res);
});

export default router;
