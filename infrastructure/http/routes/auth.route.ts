import express from 'express'
import AuthController from '../../../infrastructure/http/controllers/auth.controller'

const router = express.Router()
const authController = new AuthController()

router.post('/login', (req, res,next) => {
    authController.login(req,res,next)
  })

  export default router
