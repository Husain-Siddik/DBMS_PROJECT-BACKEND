import db from "../../config/db.js";

// Create Pet

const createPetservice = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
      INSERT INTO pets (user_id,name,type,location,image,description,status)
      VALUES (?,?,?,?,?,?,?)
    `;

        db.query(
            sql,
            [data.user_id, data.name, data.type, data.location, data.image || null, data.description, data.status],
            (err, result) => {
                if (err) reject(err);
                else resolve({
                    data: {
                        id: result.insertId,
                        user_id: data.user_id,
                        name: data.name,
                        type: data.type,
                        location: data.location,
                        image: data.image,
                        description: data.description,
                        status: data.status,

                    }
                });
            }
        );
    });
};

// get all pets 

const getAllPetsService = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM pets ORDER BY created_at DESC`;

        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

// get singel pet by id 
const getSingelPetServiceById = (id) => {

    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM pets WHERE id = ?`;

        db.query(sql, [id], (error, result) => {
            if (error) {
                return reject(error)
            }
            resolve(result[0])
        })

    })
}

const getUserPetServiceByUserid = (user_id) => {

    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM pets WHERE user_id = ?`;

        db.query(sql, [user_id], (error, result) => {

            if (error) {
                return reject(error)
            }
            resolve(result)
        })

    })

}

const deletePetServiceById = (id) => {
    return new Promise((resolve, reject) => {

        const sql = `DELETE FROM pets WHERE id = ?`;

        db.query(sql, [id], (err, result) => {

            //  DB error
            if (err) {
                return reject(err);
            }

            //  not found
            if (result.affectedRows === 0) {
                return resolve({
                    success: false,
                    message: "Rescue team not found"
                });
            }

            // success
            resolve({
                success: true,
                message: "Rescue team deleted successfully"
            });
        });
    });
};


const updatePetService = (id, userId, data) => {
    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE pets
            SET name=?, type=?, location=?, image=?, description=?, status=?
            WHERE id=? AND user_id=?
        `;

        db.query(sql, [
            data.name,
            data.type,
            data.location,
            data.image || null,
            data.description,
            data.status,
            id,
            userId
        ], (err, result) => {

            if (err) return reject(err);

            if (result.affectedRows === 0) return resolve(null);

            resolve({
                success: true,
                message: "Pet updated successfully",
                data: { id, ...data }
            });
        });
    });
};


export const petservice = {
    createPetservice,
    getAllPetsService,
    getSingelPetServiceById,
    getUserPetServiceByUserid,
    deletePetServiceById,
    updatePetService
}