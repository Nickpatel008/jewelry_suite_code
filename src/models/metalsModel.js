module.exports = (sequelize, DataTypes) => {
    const js_metals = sequelize.define(
        'js_metals',
        {
            metal_id: {
                type: DataTypes.STRING(500),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            created_datetime: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            updated_datetime: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            deleted_datetime: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            is_deleted: {
                type: DataTypes.TINYINT,
                defaultValue: 0,
            },
        },
        {
            tableName: 'js_metals',
            timestamps: false,
            underscored: true,
        }
    );

    js_metals.associate = (models) => {
        // Define associations here if 
        js_metals.belongsTo(models.metalsPrices, {
            targetKey: 'metal_id',
            foreignKey: 'metal_id',
        });
    };

    return js_metals;
};
