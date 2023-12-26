import { Sequelize, DataTypes, Model, literal } from "sequelize";
import sequelize from '../database/ConnectDB'

class Like extends Model { }

Like.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    picture_id: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
            model: 'Pictures',
            key: 'id'
        },
    },
    user_id: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
            model: 'Users',
            key: 'id'
        },
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
}, {
    sequelize,
    modelName: 'Likes'
});

sequelize.sync();
export default Like;