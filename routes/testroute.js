import express from 'express'
import { testPostController } from '../controllers/testController.js'
import userAuth from '../middleware/authMiddleware.js'
//router object
const router = express.Router()

//routers

router.post('/test-post', userAuth, testPostController)






//export
export default router