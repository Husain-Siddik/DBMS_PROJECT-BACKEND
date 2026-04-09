import app from './app.js'
import initDB from "./config/initDB.js";
import dotenv from "dotenv";
dotenv.config();


//for tabels 
initDB()



app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`);
});