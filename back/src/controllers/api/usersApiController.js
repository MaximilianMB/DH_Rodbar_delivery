const db = require('../../database/models');
const sequelize = db.sequelize;


const apiUsersController = {
    list: (req, res) => {
        let usuario
        db.User.findAll()
            .then(users => {
                let lista = users.map((user)=>({
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    rolId: user.rolId,
                    detail: "http://localhost:3001/api/users/"+ user.id

                }))
                    res.json(
                        {
                            count: {
                                // status: 200,
                                total: users.length,
                                // url: "http://localhost:3001/api/users"
                            },
                            lista
                        })
                        
                });
                
            },
    detail: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user => {
                return res.json(
                    {
                        data: {
                            id: user.id,
                            nombre: user.nombre,
                            email: user.email,
                            imagen: user.imagen
                        }
                    },
                )
            })
            .catch(errors => {
                res.send(errors)
            })
    },
    // create: function (req, res) {
    //     db.User.create(
    //         {
    //             nombre: req.body.nombre,
    //             usuario: req.body.usuario,
    //             email: req.body.email,
    //             password: bcrypt.hashSync(req.body.password, 10),
    //             imagen: req.file.filename,
    //             rolId: 3
    //         }
    //     )
    //         .then((confirm) => {
    //             //res.json(confirm)
    //             let respuesta;
    //             if (confirm) {
    //                 respuesta = {
    //                     meta: {
    //                         status: 200,
    //                         total: confirm.length,
    //                         url: 'http://localhost:3001/api/users'
    //                     },
    //                     data: confirm
    //                 }
    //             } else {
    //                 respuesta = {
    //                     meta: {
    //                         status: 204,
    //                         total: confirm.length,
    //                         url: 'http://localhost:3001/api/users'
    //                     },
    //                     data: 'Ocurrio un error'
    //                 }
    //             }
    //             res.json(respuesta)
    //         })
    //         .catch(error => res.send(error))
    // },
    // delete: (req, res) => {
    //     db.User.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(() => {
    //             return res.json(
    //                 {
    //                     meta: {
    //                         status: 200,
    //                     },
    //                 })
    //         })
    //         .catch(errors => {
    //             res.send(errors)
    //         })
    // }
}

module.exports = apiUsersController;