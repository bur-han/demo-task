import express from 'express'
import AuthService from '../services/auth.service'

const router = express.Router()
const authService = new AuthService()

router.post('/login', (req, res) => {
    authService.login(req, res)
  })

  export default router
