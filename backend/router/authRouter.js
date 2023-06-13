import express from 'express';
import { getMe, Login, Register, Logout } from '../middleware/authentication.js';

const router = express.Router();

router.get('/me', getMe);
router.post('/login', Login);
router.post('/register', Register);
router.delete('/logout', Logout);

export default router;
