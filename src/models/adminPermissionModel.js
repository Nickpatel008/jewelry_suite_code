'use strict';
module.exports = function (sequelize, DataTypes) {
    const js_admin_permissions = sequelize.define(
        'js_admin_permissions',
        {
            admin_permission_id: {
                type: DataTypes.STRING(255),
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            user_id: DataTypes.STRING(255),
            jewelry_read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            jewelry_write: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            tableName: 'js_admin_permissions',
            timestamps: false,
            underscored: true,
        }
    );

    js_admin_permissions.associate = function (models) {

    };

    return js_admin_permissions;
};
