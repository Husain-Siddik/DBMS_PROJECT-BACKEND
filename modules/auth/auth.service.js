import db from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Validate required fields
            if (!data.name || !data.email || !data.password) {
                return resolve({
                    status: "error",
                    message: "Name, email, and password are required"
                });
            }

            // Hash password
            const hashed = await bcrypt.hash(data.password, 10);

            const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;

            db.query(sql, [data.name, data.email, hashed, data.role || "user"], (err, result) => {
                if (err) {

                    //----- Handle duplicate email ---
                    if (err.code === "ER_DUP_ENTRY") {
                        return resolve({
                            status: "error",
                            message: "Email already exists"
                        });
                    }
                    return resolve({
                        status: "error",
                        message: "Database error",
                        error: err.message
                    });
                }

                // ---- user info------ 
                const user = {
                    id: result.insertId,
                    name: data.name,
                    email: data.email,
                    role: data.role || "user",
                };

                resolve({
                    status: "success",
                    message: "User registered succesfully.... ",
                    data: user
                });
            });
        } catch (err) {
            reject({
                status: "error",
                message: "Server error",
                error: err.message
            });
        }
    });
};

//


const loginUser = (data) => {
    return new Promise((resolve, reject) => {
        if (!data.email || !data.password) {
            return resolve({
                status: "error",
                message: "Email and password are required"
            });
        }

        const sql = `SELECT * FROM users WHERE email=?`;

        db.query(sql, [data.email], async (err, results) => {
            if (err) return resolve({
                status: "error",
                message: "Database error",
                error: err.message
            });

            if (results.length === 0) {
                return resolve({
                    status: "error",
                    message: "User not found"
                });
            }

            const user = results[0];

            const match = await bcrypt.compare(data.password, user.password);
            if (!match) {
                return resolve({
                    status: "error",
                    message: "Wrong password or email"
                });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            resolve({
                status: "success",
                message: "Login successfully ....",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        });
    });
};



export default {
    registerUser,
    loginUser
}