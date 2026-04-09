import service from "./auth.service.js";

const register = async (req, res) => {

    const result = await service.registerUser(req.body);


    res.json(result);
};

const login = async (req, res) => {
    const result = await service.loginUser(req.body);
    res.json(result);
};

export default {
    register,
    login
}