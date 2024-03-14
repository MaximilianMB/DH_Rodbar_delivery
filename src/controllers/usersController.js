const path = require('path');
const fs = require("fs");
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const db = require("../database/models");
const sequelize = db.Sequelize;

const usersController = {
    register: (req, res) => {
        res.render(path.join(__dirname, "../view/users/register.ejs"), { req: req })
    },
    create: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            db.User.create({
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                imagen: req.file.filename,
                rolId: 3
            })
                .then(() => {
                    res.redirect("/login");
                })
        } else {
            res.render(path.join(__dirname, "../view/users/register.ejs"), { errors: errors.errors, old: req.body, req: req })
        }
    },
    login: (req, res) => {
        res.render(path.join(__dirname, "../view/users/login.ejs"), { req: req })
    },
    logueado: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render(path.join(__dirname, "../view/users/login.ejs"), { errors: errors.errors, old: req.body, req: req });
        }

        db.User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    return res.render(path.join(__dirname, "../view/users/login.ejs"), { errors: errors, old: req.body, req: req });
                }

                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => {
                        if (!passwordMatch) {
                            return res.render(path.join(__dirname, "../view/users/login.ejs"), { errors: [{ msg: 'Contraseña incorrecta' }], old: req.body, req: req });
                        }

                        // Eliminar la contraseña del objeto usuario antes de almacenarlo en la sesión
                        delete user.password;
                        req.session.usuario = user;

                        if (req.body.recordarme) {
                            res.cookie("email", user.email, { maxAge: 1000 * 60 * 60 });
                        }

                        return res.redirect("/");
                    })
                    .catch(error => {
                        console.error("Error al comparar contraseñas:", error);
                        return res.status(500).send("Error interno del servidor");
                    });
            })
            .catch(error => {
                console.error("Error al buscar usuario en la base de datos:", error);
                return res.status(500).send("Error interno del servidor");
            });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/')
    },
    profile: (req, res) => {
        db.User.findAll({
            include: ["rol", "products"]
        })
            .then((user) => {
                if (req.session.usuario) {
                    res.render(path.join(__dirname, "../view/users/profile.ejs"), { user: user, req: req })
                } else {
                    res.redirect("/login")
                }
            })
    },
    editar: (req, res) => {
        let error = null
        db.User.findAll({
            include: ["rol", "products"]
        })
            .then((user) => {
                res.render(path.join(__dirname, "../view/users/editarUser.ejs"), { error: error, user: user, req: req })
            })
    },
    update: (req, res) => {
        let error = [];
    
        if (req.body.password1 !== req.body.password2) {
            error.push("Las contraseñas no coinciden");
        }
    
        db.User.findByPk(req.params.id)
            .then(user => {
                if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
                    error.push("La contraseña actual es incorrecta");
                }
    
                if (error.length === 0) {
                    let updateFields = {
                        nombre: req.body.nombre,
                    };
                    if(req.file){
                        updateFields.imagen = req.file.filename
                    }
                    if (req.body.password1 && req.body.password2) {
                        updateFields.password = bcrypt.hashSync(req.body.password1, 10);
                    }
    
                    db.User.update(updateFields, {
                        where: { id: req.params.id }
                    })
                        .then(() => {
                            req.session.destroy(); // Destruye la sesión para forzar al usuario a iniciar sesión nuevamente
                            return res.redirect("/login");
                        })
                        .catch(err => {
                            console.error("Error al actualizar usuario:", err);
                            return res.status(500).send("Error interno del servidor");
                        });
                } else {
                    res.render(path.join(__dirname, "../view/users/editarUser.ejs"), { error: error, old: req.body, req: req });
                }
            })
            .catch(err => {
                console.error("Error al encontrar usuario:", err);
                return res.status(500).send("Error interno del servidor");
            });
    }    
}

module.exports = usersController;