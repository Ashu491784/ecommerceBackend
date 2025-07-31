const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const userRoute = require('./routers/userRout');



const app = express();

connectDB();

app.listen(
    process.env.SERVER_PORT,
   () => console.log("server running on port" + process.env.SERVER_PORT)
);

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoute);

