import { Request, Response } from 'express';
import ActivityModel from '../../models/activities/activity.model';

export const logActivity = async (req: Request, res: Response) => {
    try {
	const newActivity = new ActivityModel(req.body);
        await newActivity.save();
        res.status(201).json({ success: true, activity: newActivity });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
};

export const getUserActivities = async (req: Request, res: Response) => {
    try {
	const userId = req.params.userId;
        const activities = await ActivityModel.find({ 'performedBy': userId }).sort({ createdAt: -1 });
        res.status(200).json(activities);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
};

interface QueryType {
    performedBy: string;
    'affectedEntity.id'?: string;
}

export const getRecentActivities = async (req: Request, res: Response) => {
    try {
	const userId = req.params.userId;
        const groupId = req.params.groupId;

        let query: QueryType = { 'performedBy': userId };

        if (groupId) {
            query['affectedEntity.id'] = groupId;
        }

	const activities = await ActivityModel.find(query).sort({ createdAt: -1 }).limit(10);
        res.status(200).json(activities);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
};
