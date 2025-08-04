const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const userRoute = require('./routers/userRout');
const itemRoute = require('./routers/ItemRoute');
const path = require("path");


const app = express();

connectDB();

app.listen(
    process.env.SERVER_PORT,
   () => console.log("server running on port" + process.env.SERVER_PORT)
);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use('/api/users', userRoute);
app.use('/api/item', itemRoute);


