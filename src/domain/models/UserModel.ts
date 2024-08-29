import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { Group } from './GroupModel';
import { Invitation as InvitationModel } from './InvitationModel';
import { JwtToken } from './JwtTokenModel';

interface UserAttributes {
    id: number;
    user_id: string;
    name: string;
    surname: string;
    email: string;
    type: string;
    status: boolean;
    login: string;
    password: string;
    phone_number: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    reset_password_token?: string | null;
    reset_password_expires?: Date | null;
    jwt_tokens?: JwtToken;

}

type UserCreationAttributes = Omit<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public user_id!: string;
    public name!: string;
    public surname!: string;
    public email!: string;
    public type!: string;
    public status!: boolean;
    public login!: string;
    public password!: string;
    public phone_number!: number;
    public created_at!: Date;
    public updated_at!: Date;
    public deleted_at?: Date;
    public reset_password_token?: string | null;
    public reset_password_expires?: Date | null;
    public jwt_tokens?: JwtToken;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public readonly jwtTokens?: JwtToken;
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
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
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
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true,
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

User.hasMany(InvitationModel, { foreignKey: 'invited_user_id' });
User.hasMany(InvitationModel, { foreignKey: 'inviting_user_id' });
User.hasMany(JwtToken, { foreignKey: 'users_id' });
User.hasMany(Group, { foreignKey: 'users_id' });

export { User, UserCreationAttributes };
