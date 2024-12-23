const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

const movieRouter = require("./routes/movieRouter");

const PORT = process.env.PORT || 3000;

app.use('/', movieRouter);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.listen(PORT, ()=> console.log(`app listening on PORT ${PORT}`));

