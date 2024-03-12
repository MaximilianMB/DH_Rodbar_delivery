module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
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
        tableName: "roles"
    }
    const Rol = sequelize.define(alias,cols,config);

    Rol.associate = function (models) {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "rolId"
        })
    }

    return Rol
};