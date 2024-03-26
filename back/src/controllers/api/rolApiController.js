const db = require('../../database/models');
const sequelize = db.sequelize;


const apiRolesController = {
    list: (req, res) => {
        db.Rol.findAll({
        })
            .then(roles => {
                let lista = roles.map((rol)=>({
                    id: rol.id,
                    nombre: rol.nombre,

                }))
                res.json(
                    {
                        count: {
                            // status: 200,
                            total: roles.length,
                            // url: "http://localhost:3001/api/roles"
                        },
                        roles: lista
                    },
                )
            })
    }
}

module.exports = apiRolesController