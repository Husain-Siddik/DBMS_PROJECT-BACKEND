import { rescueTeamService } from "./rescueTeam.service.js"

const getAllTeams = async (req, res) => {

    try {

        const result = await rescueTeamService.getAllRescueTeams()

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no rescue teams found "
            })
        }

        res.status(200).json({
            success: true,
            message: " Rescue teams retrieved successfully",
            data: result,
            totalTeams: result.length
        });


    } catch (error) {
        res.status(500).json({
            error: error.message || "Something went wrong while getting All rescue teams  "
        });
    }

}


const createRescueTeamController = async (req, res) => {
    const { name, service_area, phone, description, status } = req.body;

    if (!name || !service_area || !phone) {
        return res.status(400).json({
            success: false,
            message: "name, service_area and phone are required"
        });
    }

    try {
        const result = await rescueTeamService.createRescueTeamService({
            name, service_area, phone, description, status
        });

        res.status(201).json({
            success: true,
            message: "Rescue team created successfully",
            data: result
        });

    } catch (error) {
        console.error("Create Rescue Team Error:", error);
        res.status(500).json({ error: error.message });
    }
};



const updateRescueTeamController = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, service_area, phone, description, status } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const result = await rescueTeamService.updateRescueTeamService(id, {
            name, service_area, phone, description, status
        });

        if (!result) {
            return res.status(404).json({
                message: "Rescue team not found"
            });
        }

        res.json({
            success: true,
            message: "Rescue team updated successfully",
            data: result
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: error.message });
    }
};



const deleteRescueTeamController = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const result = await rescueTeamService.deleteRescueTeamService(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Rescue team not found"
            });
        }

        res.json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const getSingelRescueTeamInfo = async (req, res) => {

    const id = parseInt(req.params.id)

    if (!id || isNaN(id)) {
        return res.status(400).json({
            error: " invalid rescue team  id .. "
        })
    }

    try {
        const result = await rescueTeamService.getSingelRescueTeamInfo(id)

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "rescue team  data not found ..."
            })
        }

        res.status(201).json({
            success: true,
            message: "Rescue team data retrived  successfully ...",
            data: result
        });




    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message || 'somthings Went wrong'
        });
    }


}

export const rescueTeamController = {
    getAllTeams,
    createRescueTeamController,
    updateRescueTeamController,
    deleteRescueTeamController,
    getSingelRescueTeamInfo
}