import express from 'express';
import UserController from '../controllers/user.controller';
import Authentication from '../Middleware/auth';

const router = express.Router();

// Getting all
router.get('/', Authentication.authenticate, (req: any, res: any) => {
  UserController.getUsers(req, res);
});

// Getting One
router.get('/:id', (req, res) => {
  UserController.getUser(req, res);
});

// Creating one
router.post('/', async (req, res) => {
  UserController.createUser(req, res);
});

// Updating One
router.put('/:id', (req, res) => {
  UserController.updateUser(req, res);
});

// Deleting One
router.delete('/:id', (req, res) => {
  UserController.deleteUser(req, res);
});

export default router;
