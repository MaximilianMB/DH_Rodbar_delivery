const express = require("express");
const path = require("path");
const routes = require("./routes/index.js")
const routesProducts = require("./routes/products.js");
const routesUsers = require("./routes/users.js")
const app = express();
const publicPath = path.resolve(__dirname, "../public");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./view"));

app.use(methodOverride("_method"));
app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());

app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));

app.use(routes)
app.use(routesProducts);
app.use(routesUsers);

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});

