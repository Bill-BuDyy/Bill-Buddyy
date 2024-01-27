import express from 'express';
import { register, authenticate, getUserProfile, updateUserProfile } from '../../controllers/user/user.controller';

const router = express.Router();

router.post('/register', register);

router.post('/authenticate', authenticate);

router.get('/profile/:email', getUserProfile);

router.put('/profile/:email', updateUserProfile);

export default router;
