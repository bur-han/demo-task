import express from 'express'
import AuthController from '../../../infrastructure/http/controllers/auth.controller'

const router = express.Router()
const authController = new AuthController()

router.post('/login', (req, res) => {
    authController.login(req,res)
  })

  export default router
