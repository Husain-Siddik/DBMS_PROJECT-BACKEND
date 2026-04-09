import express from 'express'
import cors from 'cors'
import authRoute from './modules/auth/auth.route.js'
import petRoute from './modules/pet/pet.route.js'
import { verifyToken } from './middlewars/auth.js';

const app = express();

// app.use(cors({
//     origin: "http://localhost:3000", // React dev server
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));


app.use(cors());
app.use(express.json());


// authentication ---
app.use('/api/auth', authRoute)


//  pet 

app.use('/api/pets', petRoute);


app.get('/', (req, res) => {
    res.send(' Hello From Pet Care.......   !!!')
})


export default app