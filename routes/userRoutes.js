import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { updateUserController } from '../controllers/userController.js'
//router object 
const router = express.Router()

//get user

//uppdate 
router.put('/update-user', userAuth, updateUserController)


export default router