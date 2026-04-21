import veterinarianService from "./veterinarian.service.js";


// Create
const createVetController = async (req, res) => {

    const { name, clinic_name, address, phone, email } = req.body;

    if (!name || !address || !phone) {
        return res.status(400).json({
            error: "Missing required fields: name, address, phone"
        });
    }

    const data = { name, clinic_name, address, phone, email };

    try {
        const result = await veterinarianService.createVetService(data);

        if (!result) {
            return res.status(400).json({
                error: "Something went wrong while creating veterinarian"
            });
        }

        res.status(201).json({
            success: true,
            message: "Veterinarian added successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
};

// Get all
const getAllVetsController = async (req, res) => {

    let { search, status, page, limit } = req.query;


    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    try {
        const result = await veterinarianService.getAllVetService({
            search,
            status,
            page,
            limit
        });

        res.status(200).json({
            success: true,
            page: page,
            limit: limit,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
};

// singel 

const getVetByIdController = async (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid ID format"
        });
    }

    try {
        const result = await veterinarianService.getVetByIdService(id);

        if (!result) {
            return res.status(404).json({
                error: "Veterinarian not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
};

// Update
const updateVetController = async (req, res) => {

    const id = parseInt(req.params.id);
    const { name, clinic_name, address, phone, email, status } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid ID format"
        });
    }

    const data = { name, clinic_name, address, phone, email, status };

    if (!name || !address || !phone) {
        return res.status(400).json({
            error: "name, address, phone required"
        });
    }

    try {
        const result = await veterinarianService.updateVetService(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Veterinarian not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Veterinarian updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
};

// Delete
const deleteVetController = async (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid ID format"
        });
    }

    try {
        const result = await veterinarianService.deleteVetService(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Veterinarian not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Veterinarian deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong"
        });
    }
};

export default {
    createVetController,
    getAllVetsController,
    updateVetController,
    deleteVetController,
    getVetByIdController
}