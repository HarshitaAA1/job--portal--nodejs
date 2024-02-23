import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

//router object
const router = express.Router()
/**
 * @swagger
 * components:
 *  schemas:
 *    user:
 *      type:Object
 *      required:
 *        -name
 *        -lastName
 *        -email
 *        -password
 *        -location
 *      properties :
 *         id:
 *            type: string
 *            description : The Auto-generated id of user collection 
 *          name:
 *             type: string
 *             description : user name 
 *          lastName:
 *              type: string
 *              description : last name
 *          email :
 *              type: string
 *              description : user email 
 *          password:
 *              type: string
 *              description : password should be greater than 6 character
 *          location:
 *               type: string
 *               description : location  of user
 *       example:
 *               id:eifh8fnwj
 *               name:john
 *               lastname:Doe
 *               email:johndoes@gmail.com
 *               password:test@
 *               location:"mumbai"
 */

// register || post 
router.post('/register', registerController)

//login ||post
router.post('/login', loginController)


//export
export default router