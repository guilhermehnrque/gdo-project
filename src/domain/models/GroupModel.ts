import { DataTypes, Model } from 'sequelize';
import { User } from './UserModel'; 
import sequelize from '../../infrastructure/database/index'; 

interface GroupAttributes {
    id?: number;
    description: string;
    is_active: number;
    users_id: number;
    created_at: Date;
    updated_at?: Date;
}

class Group extends Model<GroupAttributes> implements GroupAttributes {
    public id!: number;
    public description!: string;
    public is_active!: number;
    public users_id!: number;
    public created_at!: Date;
    public updated_at?: Date;
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
    },
}, {
    sequelize,
    tableName: 'groups',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Group.belongsTo(User, { foreignKey: 'users_id', as: 'user' });

export default Group;
