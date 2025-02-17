import express from 'express';
const router = express.Router();
import UserController from '../controllers/usercontroller.js';
import checkAuth from '../middlewares/auth.js';

// Authentication Middleware for Protected Routes
router.use('/changePass', checkAuth);
router.use('/loggedUser', checkAuth);
router.use('/contacts', checkAuth);


// User Routes
router.post('/register', UserController.userReg);
router.post('/login', UserController.userLog);
router.post('/changePass', UserController.changePass);
router.get('/loggedUser', UserController.loggedUser);

// Contact Routes
router.post('/contact', checkAuth, UserController.submitContactForm);
router.get('/contacts', UserController.getUserContacts);   // Get user contacts

export default router;
