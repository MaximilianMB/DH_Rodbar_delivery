const db = require('../../database/models');
const sequelize = db.sequelize;


const apiCategoriesController = {
    list: (req, res) => {
        db.Category.findAll({
        })
            .then(categories => {
                let lista = categories.map((category)=>({
                    id: category.id,
                    nombre: category.nombre,

                }))
                res.json(
                    {
                        count: {
                            // status: 200,
                            total: categories.length,
                            // url: "http://localhost:3001/api/categories"
                        },
                        categories: lista
                    },
                )
            })
    }
}

module.exports = apiCategoriesController