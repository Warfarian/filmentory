const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

const movieRouter = require("./routes/movieRouter");

const PORT = process.env.PORT || 3000;
const assetPath = (__dirname,path.join("public"))
app.use(express.static(assetPath));

app.use(express.urlencoded({ extended: true }));

app.use('/', movieRouter);
app.use('/genre', movieRouter);
app.use('/new', movieRouter);
app.use('/:movie_id/delete', movieRouter);
app.use('/:movie_id/update', movieRouter);
app.use('/search',movieRouter )

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.listen(PORT, ()=> console.log(`app listening on PORT ${PORT}`));

