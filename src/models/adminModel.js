'use strict';
module.exports = function (sequelize, DataTypes) {
    const js_admin = sequelize.define(
        'js_admin',
        {
            user_id: {
                type: DataTypes.STRING(255),
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            profile: DataTypes.STRING(255),
            name: DataTypes.STRING(100),
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: DataTypes.STRING(255),
            contact: DataTypes.BIGINT,
            admin_type: DataTypes.INTEGER,
            access_token: DataTypes.STRING(500),
            created_datetime: DataTypes.STRING(100),
            updated_datetime: DataTypes.STRING(100),
            deleted_datetime: DataTypes.STRING(100),
            is_super: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            is_deleted: {
                type: DataTypes.TINYINT,
                defaultValue: 0,
            },
        },
        {
            tableName: 'js_admin',
            timestamps: false,
            underscored: true,
        }
    );

    js_admin.associate = function (models) {
        js_admin.belongsTo(models.adminPermissions, {
            // as: 'admin_permissions',
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
    };

    return js_admin;
};
