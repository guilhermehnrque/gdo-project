import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Group } from './GroupModel';
import { User } from './UserModel';

interface ManagerAttributes {
    id: number;
    groups_id: number;
    users_id: number;
}

type ManagerCreationAttributes = Omit<ManagerAttributes, 'id'>;

class ManagerModel extends Model<ManagerAttributes, ManagerCreationAttributes> implements ManagerAttributes {
    public id!: number;
    public groups_id!: number;
    public users_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ManagerModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id'
        }
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    sequelize,
    tableName: 'managers',
    modelName: 'Manager'
});

ManagerModel.belongsTo(Group, { foreignKey: 'groups_id' });
ManagerModel.belongsTo(User, { foreignKey: 'users_id' });

export default ManagerModel;