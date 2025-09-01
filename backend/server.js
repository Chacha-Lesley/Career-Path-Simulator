const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// include auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req, res) => res.send('Backend is running 🚀'));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
