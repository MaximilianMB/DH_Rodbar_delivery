module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAd',
        updatedAt: 'updatedAd',
        deletedAt: false,
        tableName: "categorias"
    }
    const Category = sequelize.define(alias,cols,config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "categoriaId"
        })
    }

    return Category
};