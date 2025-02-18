module.exports = (sequelize, DataTypes) => {
    const js_jewelry = sequelize.define(
        'js_jewelry',
        {
            jewelry_id: {
                type: DataTypes.STRING(500),
                primaryKey: true,
                allowNull: false,
            },
            jewelry_type_sub_id: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: true,
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
            tableName: 'js_jewelry',
            timestamps: false,
            underscored: true,
        }
    );

    js_jewelry.associate = (models) => {
        js_jewelry.belongsTo(models.JewelrySubType, {
            foreignKey: 'jewelry_type_sub_id',
            targetKey: 'jewelry_type_sub_id'
        });
        js_jewelry.belongsTo(models.jewelryMetadata, {
            foreignKey: 'jewelry_id',
            targetKey: 'jewelry_id'
        });
    };

    return js_jewelry;
};
