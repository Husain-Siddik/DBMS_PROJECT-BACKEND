
import express from 'express';
import petController from './pet.controller.js';
import { verifyToken } from '../../middlewars/auth.js';

const router = express.Router()



// private  routes 
router.post('/', verifyToken, petController.createPetController)
router.get('/my-pets', verifyToken, petController.getPetByUserId)


//public routes 
router.get('/', petController.getAllPets)
router.get('/:id', petController.getSingelPetById)

export default router;