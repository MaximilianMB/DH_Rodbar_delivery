const path = require('path');
const fs = require("fs");
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")

const usersController = {
    register:(req, res)=>{
        res.render(path.join(__dirname, "../view/users/register.ejs"))
    },
    create: (req, res)=>{
        let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let usuario = {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                imagen: req.file ? req.file.filename : '',
                rol : 2
            };
            usuarios.push(usuario);
            let nuevoUsuarioGuardar = JSON.stringify(usuarios, null, 2);
            fs.writeFileSync(path.join(__dirname, "../data/users.json"), nuevoUsuarioGuardar);
            res.redirect("/login");
        }else{
            res.render(path.join(__dirname, "../view/users/register.ejs"), {errors: errors.errors, old: req.body})
        }
    },
    login:(req, res)=>{
        res.render(path.join(__dirname, "../view/users/login.ejs"))
    },
    logueado: (req,res)=>{
        let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let usuarioLogin = usuarios.find(usuario => usuario.email == req.body.email);
            delete usuarioLogin.password;
            req.session.usuario = usuarioLogin;

            if(req.body.recordarme){
                res.cookie("email", usuarioLogin.email, {maxAge: 1000*60*60})
            }
            return res.redirect("/")
        }else{
            res.render(path.join(__dirname, "../view/users/login.ejs"), {errors: errors.errors, old: req.body})
        }
    }
    
}

module.exports = usersController;