import express from 'express';
import { rescueTeamController } from './rescueTeams.controller.js';
import { isAdmin, verifyToken } from '../../middlewars/auth.js';


const router = express.Router()

// private 
router.post('/', verifyToken, isAdmin, rescueTeamController.createRescueTeamController)
router.patch('/:id', verifyToken, isAdmin, rescueTeamController.updateRescueTeamController)
router.delete('/:id', verifyToken, isAdmin, rescueTeamController.deleteRescueTeamController)


// public 
router.get('/', rescueTeamController.getAllTeams)
router.get('/:id', rescueTeamController.getSingelRescueTeamInfo)

export default router;
