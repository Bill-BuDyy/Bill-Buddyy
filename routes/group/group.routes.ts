import express from 'express';
import {
  createGroup,
  getGroupDetails,
  updateGroupDetails,
  addMemberToGroup,
  removeMemberFromGroup,
  listGroupsForUser
} from '../../controllers/group/group.controller';

const router = express.Router();

router.post('/create', createGroup);
router.get('/details/:id', getGroupDetails);
router.put('/update/:id', updateGroupDetails);
router.post('/addMember/:groupId', addMemberToGroup);
router.post('/removeMember/:groupId', removeMemberFromGroup);
router.get('/user/:userId', listGroupsForUser);

export default router;
