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


export default {
    getAllPets,
    createPetController,
    getSingelPetById,
    getPetByUserId
}