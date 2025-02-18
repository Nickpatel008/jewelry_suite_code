module.exports = (sequelize, DataTypes) => {
    const js_jewelry_type = sequelize.define(
        'js_jewelry_type',
        {
            jewelry_type_id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_by: {
                type: DataTypes.STRING,
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
            tableName: 'js_jewelry_type',
            timestamps: false,
            underscored: true,
        }
    );


    js_jewelry_type.associate = (models) => {
        js_jewelry_type.hasMany(models.JewelrySubType, {
            targetKey: 'jewelry_type_id',
            foreignKey: 'jewelry_type_id',
            // as: 'sub_types'
        });
    };


    return js_jewelry_type;
};
