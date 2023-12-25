import { Sequelize, DataTypes, Model, literal } from "sequelize";
const sequelize = new Sequelize();

class User extends Model { }

User.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(255),
        defaultValue: null,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    passwordResetToken: {
        type: DataTypes.STRING(255),
        defaultValue: null,
    },
    passwordResetAt: {
        type: DataTypes.DATE,
        defaultValue: null,
    },

    createdBy: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updateBy: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
            model: 'Users',
            key: 'id'
        },
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
}, {
    sequelize,
    modelName: 'Users'
});

sequelize.sync();
export = User;