const db = require('../../database/models');
const sequelize = db.sequelize;


const apiProductsController = {
    list: (req, res) => {
        db.Product.findAll({
            include: ["category"]
        })
            .then(products => {
                let lista = products.map((product)=>({
                    id: product.id,
                    nombre: product.nombre,
                    ingredientes: product.ingredientes,
                    precio: product.precio,
                    relacionMN: "Category",
                    detalle: "http://localhost:3001/api/products/" + product.id

                }))
                res.json(
                    {
                        count: {
                            // status: 200,
                            total: products.length,
                            // url: "http://localhost:3001/api/products"
                        },
                        products: lista
                    },
                )
            })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                return res.json(
                    {
                        // meta: {
                        //     status: 200,
                        //     total: product.length,
                        //     url: "http://localhost:3001/api/products/" + req.params.id
                        // },
                        data: product
                    },
                )
            })
            .catch(errors =>{
                res.send(errors)
            })
},
// create: function (req,res) {
//     db.Product.create(
//         {
//             nombre: req.body.nombre,
//             ingredientes: req.body.ingredientes,
//             categoriaId: req.body.categoriaId,
//             precio: req.body.precio,
//             imagen: req.file.filename
//         }
//     )
//     .then((confirm)=> {
//         //res.json(confirm)
//         let respuesta;
//         if(confirm){
//             respuesta = {
//                 meta: {
//                     status: 200,
//                     total: confirm.length,
//                     url: 'http://localhost:3001/api/products'
//                 },
//                 data : confirm
//             }
//         }else{
//             respuesta = {
//                 meta: {
//                     status: 204,
//                     total: confirm.length,
//                     url: 'http://localhost:3001/api/products'
//                 },
//                 data : 'Ocurrio un error'
//             } 
//         }
//         res.json(respuesta)
//     })          
//     .catch(error => res.send(error))
// },
//     delete: (req, res) => {
//         db.Product.destroy({
//             where:{
//                 id: req.params.id
//             }
//         })
//             .then(() => {
//                 return res.json(
//                     {
//                         meta: {
//                             status: 200,
//                     },
//             })
//             })
//             .catch(errors =>{
//                 res.send(errors)
//             })
// }
}

module.exports = apiProductsController;