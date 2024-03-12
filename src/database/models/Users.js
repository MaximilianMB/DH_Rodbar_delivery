module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
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
        },
        usuario: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        rolId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'createdAd',
        updatedAt: 'updatedAd',
        deletedAt: false,
        tableName: "usuarios"
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = function (models) {
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rolId"
        })

        User.belongsToMany(models.Product, {
            as: "products",
            through: 'usuariosProductos',
            foreignKey: 'usuarioId',
            otherKey: 'productoId',
        })
    }

    return User
};