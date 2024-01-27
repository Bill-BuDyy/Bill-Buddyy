import { Request, Response } from 'express';
import GroupModel from '../../models/groups/group.model';

export const createGroup = async (req: Request, res: Response) => {
    try {
	const { groupName, members, createdBy, description } = req.body;
        const newGroup = new GroupModel({
            groupName,
            members,
            createdBy,
            description
        });
	await newGroup.save();
        res.status(201).send(newGroup);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getGroupDetails = async (req: Request, res: Response) => {
    const groupId = req.params.id;
    try {
	const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(404).send('Group not found.');
        }
	res.status(200).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateGroupDetails = async (req: Request, res: Response) => {
    const groupId = req.params.id;
    const updates = req.body;
    try {
	const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(404).send('Group not found.');
        }

	const groupAny = group as any;
        Object.keys(updates).forEach((updateKey) => {
            groupAny[updateKey] = updates[updateKey];
        });

	await group.save();
        res.status(200).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const addMemberToGroup = async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const memberId = req.body.memberId;

    try {
	const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(404).send('Group not found.');
        }

	if (!group.members.includes(memberId)) {
            group.members.push(memberId);
            await group.save();
            res.status(200).send('Member added.');
        } else {
            res.status(400).send('Member already in group.');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const removeMemberFromGroup = async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const memberId = req.body.memberId;

    try {
	const group = await GroupModel.findById(groupId);
        if (!group) {
            return res.status(404).send('Group not found.');
        }

        if (group.members.includes(memberId)) {
            group.members = group.members.filter(member => member.toString() !== memberId);
            await group.save();
            res.status(200).send('Member removed.');
        } else {
            res.status(400).send('Member not in group.');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const listGroupsForUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
	const groups = await GroupModel.find({ members: userId });
        res.status(200).send(groups);
    } catch (error) {
        res.status(500).send(error);
    }
};
