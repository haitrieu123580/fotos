import { Sequelize, DataTypes, Model, literal } from "sequelize";
import sequelize from '../database/ConnectDB'

class Picture extends Model { }

Picture.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: true
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
    modelName: 'Pictures'
});

sequelize.sync();
export default Picture;