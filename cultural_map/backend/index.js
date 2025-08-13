const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// const locationsRoute = require('./routes/locations');
// app.use('/api', locationsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
