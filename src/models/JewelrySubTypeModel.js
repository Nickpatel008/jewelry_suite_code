module.exports = (sequelize, DataTypes) => {
    const js_jewelry_sub_type = sequelize.define(
        'js_jewelry_sub_type',
        {
            jewelry_type_sub_id: {
                type: DataTypes.STRING(500),
                primaryKey: true,
                allowNull: false,
            },
            jewelry_type_id: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            concept: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            created_by: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            created_datetime: DataTypes.STRING(100),
            updated_datetime: DataTypes.STRING(100),
            deleted_datetime: DataTypes.STRING(100),
            is_deleted: {
                type: DataTypes.TINYINT,
                defaultValue: 0,
            },
        },
        {
            tableName: 'js_jewelry_sub_type',
            timestamps: false,
            underscored: true,
        }
    );

    js_jewelry_sub_type.associate = (models) => {
        js_jewelry_sub_type.belongsTo(models.JewelryType, {
            foreignKey: 'jewelry_type_id',
            targetKey: 'jewelry_type_id'
        });
    };

    return js_jewelry_sub_type;
};
