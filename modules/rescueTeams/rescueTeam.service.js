import db from "../../config/db.js";

const getAllRescueTeams = () => {

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM rescue_teams ORDER BY created_at DESC`;

        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

}

const createRescueTeamService = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO rescue_teams (name, service_area, phone, description, status)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            data.name,
            data.service_area,
            data.phone,
            data.description || null,
            data.status || 'active'
        ], (err, result) => {
            if (err) return reject(err);

            resolve({
                id: result.insertId,
                ...data
            });
        });
    });
};


const updateRescueTeamService = (id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE rescue_teams
            SET name=?, service_area=?, phone=?, description=?, status=?
            WHERE id=?
        `;

        db.query(sql, [
            data.name,
            data.service_area,
            data.phone,
            data.description || null,
            data.status,
            id
        ], (err, result) => {
            if (err) return reject(err);

            if (result.affectedRows === 0) return resolve(null);

            resolve({ id, ...data });
        });
    });
};

const deleteRescueTeamService = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM rescue_teams WHERE id=?`;

        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);

            if (result.affectedRows === 0) return resolve(null);

            resolve({
                success: true,
                message: "Rescue team deleted successfully"
            });
        });
    });
};

const getSingelRescueTeamInfo = (id) => {

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM rescue_teams WHERE id=?`

        db.query(sql, [id], (err, result) => {
            if (err) return reject(err)
            resolve(result[0])
        })

    })

}

export const rescueTeamService = {
    getAllRescueTeams,
    createRescueTeamService,
    updateRescueTeamService,
    deleteRescueTeamService,
    getSingelRescueTeamInfo

}