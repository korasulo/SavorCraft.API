const express = require("express");
const cors = require("cors");
require("dotenv").config();
const api = require("./api");
const errHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use("/api", api);
app.use(errHandler);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
