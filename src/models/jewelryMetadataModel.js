module.exports = (sequelize, DataTypes) => {
    const js_jewelry_metadata = sequelize.define(
        'js_jewelry_metadata',
        {
            jewelry_metadata_id: {
                type: DataTypes.STRING(500),
                primaryKey: true,
                allowNull: false,
            },
            jewelry_id: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            metal_id: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            images: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            natural_price: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            lab_price: {
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
            tableName: 'js_jewelry_metadata',
            modelName: 'js_jewelry_metadata',
            timestamps: false,
            underscored: true,
        }
    );

    js_jewelry_metadata.associate = (models) => {
        // Define associations here if needed
    };

    return js_jewelry_metadata;
};
