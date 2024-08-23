import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index'; 
import Group from './GroupModel';

interface UserAttributes {
    id: number;
    user_id: string;
    name: string;
    surname: string;
    type: string;
    status: number;
    is_staff: number;
    login: string;
    password: string;
    phone_number: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

type UserCreationAttributes = Omit<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public user_id!: string;
    public name!: string;
    public surname!: string;
    public type!: string;
    public status!: number;
    public is_staff!: number;
    public login!: string;
    public password!: string;
    public phone_number!: number;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    is_staff: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

User.hasMany(Group, { foreignKey: 'users_id' });

export { User, UserCreationAttributes };
