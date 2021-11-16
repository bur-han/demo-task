import express from 'express'
import UsersService from '../../../services/users.service'

const router = express.Router()
const userService = new UsersService()

// Creating one
router.post('/', async (req, res) => {
    userService.createUser(req, res)
  })

  export default router
