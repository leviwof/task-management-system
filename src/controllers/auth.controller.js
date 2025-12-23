import { validationResult } from "express-validator";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

    console.log("Request body received for registration:", req.body)
    console.log("Name:", req.body.name)
    console.log("Email:", req.body.email)
    await registerUser(req.body);
    res.json({ success: true });
};

export const login = async (req, res) => {
    const token = await loginUser(req.body);
    res.json({ success: true, data: { token } });
};
