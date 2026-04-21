import db from "../../config/db.js";

const createVetService = (data) => {
    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO veterinarians 
            (name, clinic_name, address, phone, email) 
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            data.name,
            data.clinic_name,
            data.address,
            data.phone,
            data.email
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });

    });
};

const getAllVetService = ({ search, status, page, limit }) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM veterinarians WHERE 1=1`;
        let values = [];

        // 🔍 Search
        if (search) {
            sql += ` AND (name LIKE ? OR clinic_name LIKE ?)`;
            values.push(`%${search}%`, `%${search}%`);
        }

        // 🟢 Filter
        if (status) {
            sql += ` AND status=?`;
            values.push(status);
        }

        // 📄 Pagination
        const offset = (page - 1) * limit;
        sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        values.push(limit, offset);


        // const sql = `SELECT * FROM veterinarians ORDER BY created_at DESC`;

        db.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });

    });
};

const updateVetService = (id, data) => {
    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE veterinarians 
            SET name=?, clinic_name=?, address=?, phone=?, email=?, status=? 
            WHERE id=?
        `;

        db.query(sql, [
            data.name,
            data.clinic_name,
            data.address,
            data.phone,
            data.email,
            data.status,
            id
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });

    });
};

const deleteVetService = (id) => {
    return new Promise((resolve, reject) => {

        const sql = `DELETE FROM veterinarians WHERE id=?`;

        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });

    });
};


const getVetByIdService = (id) => {
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM veterinarians WHERE id=?`;

        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]); // ⚠️ single object
        });

    });
};

export default {
    createVetService,
    updateVetService,
    getAllVetService,
    deleteVetService,
    getVetByIdService
}