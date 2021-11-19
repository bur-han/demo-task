import express from 'express'
import UserController from '../controllers/user.controller'

const router = express.Router()
const userController = new UserController()

// Creating one
router.post('/', async (req, res) => {
    userController.createUser(req, res)
  })

  export default router
