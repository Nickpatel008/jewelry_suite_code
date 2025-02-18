module.exports = (sequelize, DataTypes) => {
    const js_metal_prices = sequelize.define(
        'js_metal_prices',
        {
            metal_prices_id: {
                type: DataTypes.STRING(500),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            metal_id: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            type: {
                type: DataTypes.INTEGER,
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
            tableName: 'js_metal_prices',
            timestamps: false,
            underscored: true,
        }
    );

    js_metal_prices.associate = (models) => {
        // Define associations here if needed
    };

    return js_metal_prices;
};
