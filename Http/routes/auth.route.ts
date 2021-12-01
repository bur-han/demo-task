import express from 'express'
import AuthController from '../controllers/auth.controller'

const router = express.Router()
const authController = new AuthController()

router.post('/login', (req, res,next) => {
    authController.loginWithJwt(req,res,next)
  })

  export default router