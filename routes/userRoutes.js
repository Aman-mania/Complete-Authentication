import express from 'express'
const router = express.Router();

import UserController from '../controllers/usercontroller.js';
import checkAuth from '../middlewares/auth.js';

router.use('/changePass', checkAuth);
router.use('/loggedUser',checkAuth);

router.post('/register',UserController.userReg)
router.post('/login',UserController.userLog)
router.post('/pass-reset',UserController.passReset)
router.post('/reset-pass/:id/:token',UserController.userPassReset)

router.post('/changePass',UserController.changePass)
router.get('/loggedUser',UserController.loggedUser)

export default router