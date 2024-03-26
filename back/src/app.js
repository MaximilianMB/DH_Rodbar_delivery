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
const apiUsersRoutes = require("./routes/api/usersApi.js")
const apiProductsRoutes = require("./routes/api/productsApi.js")
const apiCategoriesRoutes = require("./routes/api/categoriesApi.js")
const apiRolesRoutes = require("./routes/api/rolesApi.js")

const cors = require("cors")



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./view"));

app.use(cors());
app.use(methodOverride("_method"));
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: false
}));
app.use(cookieParser());

app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));

app.use(routes)
app.use(routesProducts);
app.use(routesUsers);
app.use(apiUsersRoutes);
app.use(apiProductsRoutes);
app.use(apiCategoriesRoutes);
app.use(apiRolesRoutes)

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});

