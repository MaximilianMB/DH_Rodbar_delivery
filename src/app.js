const express = require("express");
const path = require("path");
const routesProducts = require("./routes/products.js");
const routesUsers = require("./routes/users.js")
const app = express();
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./view"))

app.use(methodOverride("_method"));

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));



app.use(express.urlencoded({extended: false}));

app.use(routesProducts);
app.use(routesUsers)

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});

