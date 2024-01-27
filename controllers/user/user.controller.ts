import { Request, Response } from 'express';
import UserModel from '../../models/users/user.model';

export const register = async (req: Request, res: Response) => {
    try {
	const { email, ...otherDetails } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send('Email already in use.');
        }

	const user = new UserModel(req.body);
        await user.save();

        const userObject: any = user.toObject();
        delete userObject.password;

        res.status(201).send(userObject);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const authenticate = async (req: Request, res: Response) => {
    try {
	const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

	if (user.password !== password) {
            return res.status(401).send('Invalid password.');
        }

	const userObject: any = user.toObject();
        delete userObject.password;

        res.status(200).send(userObject);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
	const email = req.params.email;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        const userObject: any = user.toObject();
        delete userObject.password;

        res.status(200).send(userObject);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
	const email = req.params.email;
        const updates = req.body;

        const user = await UserModel.findOneAndUpdate({ email }, updates, { new: true });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        const userObject: any = user.toObject();
        delete userObject.password;

        res.status(200).send(userObject);
    } catch (error) {
        res.status(400).send(error);
    }
};
