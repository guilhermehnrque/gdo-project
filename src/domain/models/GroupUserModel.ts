import { DataTypes, Model } from 'sequelize';
import { User } from './UserModel'; 
import sequelize from '../../infrastructure/database/index'; 
import Group from './GroupModel'; 

interface GroupsUsersAttributes {
    id?: number;
    groups_id: number;
    users_id: number;
}

class GroupsUsers extends Model<GroupsUsersAttributes> implements GroupsUsersAttributes {
    public id!: number;
    public groups_id!: number;
    public users_id!: number;
}

GroupsUsers.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    groups_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id',
        },
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'GroupsUsers',
    tableName: 'groups_users',
    timestamps: false,
});

GroupsUsers.belongsTo(User, { foreignKey : 'users_id'});
GroupsUsers.belongsTo(Group, { foreignKey : 'groups_id'});

export default GroupsUsers;
