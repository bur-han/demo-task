import express from 'express'
import UserController from '../controllers/user.controller'

const router = express.Router()
const userController = new UserController()

// Getting all
router.get('/', (req:any, res:any) => {
  userController.getUsers(req,res)
})

// Getting One
router.get('/:id',  (req, res) => {
  userController.getUser(req,res)
})

// Creating one
router.post('/', async (req, res) => {
    userController.createUser(req, res)
})

// Updating One
router.put('/:id',  (req, res) => {
  userController.updateUser(req,res)
 })
 
 // Deleting One
 router.delete('/:id',  (req, res) => {
  userController.deleteUser(req,res)
 })
 
  export default router
