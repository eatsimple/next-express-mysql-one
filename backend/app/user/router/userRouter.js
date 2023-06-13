import express from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from '../controller/userController.js';
import { verifyUsers, adminAccess } from '../../../middleware/authProtect.js';

const router = express.Router();

router.get('/users', verifyUsers, adminAccess, getUsers);
router.get('/users/:id', verifyUsers, adminAccess, getUsersById);
router.post('/users', verifyUsers, adminAccess, createUsers);
router.patch('/users/:id', verifyUsers, adminAccess, updateUsers);
router.delete('/users/:id', verifyUsers, adminAccess, deleteUsers);

export default router;
