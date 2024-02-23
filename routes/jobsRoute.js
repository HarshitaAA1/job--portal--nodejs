import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createJobController, deleteJobController, getAlljobsController, updateJobController } from '../controllers/jobController.js'
const router = express.Router()

//create jobs
router.post('/create-job', userAuth, createJobController)

// get jobs 
router.get('/get-job', userAuth, getAlljobsController)

// update jobs|| put|| patch
router.patch('/update-job/:id', userAuth, updateJobController)

// delete jobs || put || patch
router.delete('/delete-job/:id', userAuth, deleteJobController)
export default router