module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        ingredientes: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        categoriaId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: dataTypes.DECIMAL(12,2),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAd',
        updatedAt: 'updatedAd',
        deletedAt: false,
        tableName: "productos"
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoriaId"
        })

        Product.belongsToMany(models.User, {
            as: "users",
            through: 'usuariosProductos',
            foreignKey: 'productoId',
            otherKey: 'usuarioId',
        })
    }

    return Product
};