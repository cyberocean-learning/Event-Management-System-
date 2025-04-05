require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());


connectDB();


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
