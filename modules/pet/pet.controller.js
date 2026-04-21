import { petservice } from "./pet.service.js";

const getAllPets = async (req, res) => {

    try {

        const pets = await petservice.getAllPetsService()

        if (pets.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no pets found"
            })
        }

        res.status(200).json({
            success: true,
            data: pets,
            totalPets: pets.length
        });


    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong while getting All pets "
        });
    }

}

const createPetController = async (req, res) => {

    const user_id = req.user.id
    const { name, type, location, image, description, status } = req.body

    if (!user_id || !name || !type || !location || !description || !status) {
        return res.status(400).json(
            {
                error: "Missing required field like ..name ,type,location,description,status"
            }
        )
    }
    const data = {
        user_id, name, type, location, image, description, status
    }


    try {

        const result = await petservice.createPetservice(data)

        if (!result) {
            return res.status(400).json({
                error: "something went wrong while creating pet post "
            })
        }

        res.status(201).json({
            success: true,
            message: "Pet added successfully",
            data: result
        })





    } catch (error) {
        res.status(500).json({ error: error.message || "something went wrong" })
    }


}




const getSingelPetById = async (req, res) => {

    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res.status(400).json({
            error: " invalid pet id .. "
        })
    }

    try {

        const result = await petservice.getSingelPetServiceById(id)

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "pet data not found "
            })
        }

        res.status(200).json({
            success: true,
            message: "Pet data retrieved successfully",
            data: result
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "somthing went wrong ",
            error: error.message || "pet data is not available "
        })
    }



}

const getPetByUserId = async (req, res) => {

    const user_id = req.user.id

    try {

        const result = await petservice.getUserPetServiceByUserid(user_id)

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "could not find any pet"
            })
        }

        res.status(200).json({
            success: true,
            message: "your all pet related post are here ...",
            data: result
        })


    } catch (error) {
        res.status(500).json({ error: error.message || "something went wrong" })
    }



}

const deletePetById = async (req, res) => {

    const id = parseInt(req.params.id);

    const user_id = req.user.id

    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            error: "Invalid pet id"
        });
    }

    try {

        const result = await petservice.deletePetServiceById(id);


        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Pet not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Pet deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message || "Delete failed"
        });
    }
};

const updatePetController = async (req, res) => {

    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const {
        name,
        type,
        location,
        image,
        description,
        status
    } = req.body;

    //  ID validation
    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid pet ID"
        });
    }

    try {
        const data = {
            name,
            type,
            location,
            image,
            description,
            status
        }

        const result = await petservice.updatePetService(id, userId, data);

        // not found / unauthorized
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Pet not found or unauthorized"
            });
        }


        res.status(200).json({
            success: true,
            message: "Pet updated successfully",
            data: result
        });

    } catch (error) {

        console.error("Update Error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export default {
    getAllPets,
    createPetController,
    getSingelPetById,
    getPetByUserId,
    deletePetById,
    updatePetController

}