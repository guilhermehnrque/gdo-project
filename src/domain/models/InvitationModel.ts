import { Model, DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/database/index';

interface InvitationAttributes {
    id: number;
    code: string;
    status: string;
    invited_user_id: number;
    expires_at: Date | undefined;
    created_at?: Date;
    updated_at?: Date;
    groups_id: number;
    inviting_user_id: number | undefined;
}

type InvitationCreationAttributes = Omit<InvitationAttributes, 'id' | 'created_at' | 'updated_at' >;

class Invitation extends Model<InvitationAttributes, InvitationCreationAttributes> implements InvitationAttributes {
    public id!: number;
    public code!: string;
    public status!: string;
    public invited_user_id!: number;
    public expires_at!: Date;
    public created_at!: Date;
    public updated_at!: Date;
    public groups_id!: number;
    public inviting_user_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Invitation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        invited_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
        },
        groups_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inviting_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'invites',
        modelName: 'Invitation',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        sequelize,
    }
);

export { Invitation };