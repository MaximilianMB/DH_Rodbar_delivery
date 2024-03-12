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
        let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let usuarioLogin = usuarios.find(usuario => usuario.email == req.body.email);
            delete usuarioLogin.password;
            req.session.usuario = usuarioLogin;

            if (req.body.recordarme) {
                res.cookie("email", usuarioLogin.email, { maxAge: 1000 * 60 * 60 })
            }
            return res.redirect("/")
        } else {
            res.render(path.join(__dirname, "../view/users/login.ejs"), { errors: errors.errors, old: req.body, req: req })
        }
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
        db.User.findAll({
            include: ["rol", "products"]
        })
            .then((user)=>{
                res.render(path.join(__dirname, "../view/users/editarUser.ejs"), {user: user, req: req})
            })
    },
    update: (req, res) => {
        db.User.update({
            nombre: req.body.nombre,
            password: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file.filename,
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/profile")
            })
            .catch(error => res.send(error))
    }
}

module.exports = usersController;