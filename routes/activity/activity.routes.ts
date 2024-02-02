import express from 'express';
import { getUserActivities, getRecentActivities, logActivity } from '../../controllers/activity/activity.controller';

const router = express.Router();

router.get('/user/:userId', getUserActivities);

router.get('/recent/:userId/:groupId?', getRecentActivities);

router.post('/log', logActivity);

export default router;
