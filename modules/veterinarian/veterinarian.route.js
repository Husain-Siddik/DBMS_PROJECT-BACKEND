import express from "express";
import veterinarianController from "./veterinarian.controller.js";
import { isAdmin, verifyToken } from '../../middlewars/auth.js';



const router = express.Router();

// anyone can see
router.get("/", veterinarianController.getAllVetsController);
router.get('/:id', veterinarianController.getVetByIdController)

// Only Admin
router.post("/", verifyToken, isAdmin, veterinarianController.createVetController);
router.put("/:id", verifyToken, isAdmin, veterinarianController.updateVetController);
router.delete("/:id", verifyToken, isAdmin, veterinarianController.deleteVetController);

export default router;