import { DataTypes, Model } from 'sequelize';
import { User } from './UserModel';
import Local from './LocalModel';
import sequelize from '../../infrastructure/database/index';
import Invitation from './InvitationModel';

interface GroupAttributes {
    id: number;
    description: string;
    is_active: number;
    users_id: number;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

type GroupCreationAttributes = Omit<GroupAttributes, 'id' | 'created_at' | 'updated_at'>;

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
    public id!: number;
    public description!: string;
    public is_active!: number;
    public users_id!: number;
    public created_at!: Date;
    public updated_at?: Date;
    public deleted_at?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly local?: Local;
    public readonly deletedAt?: Date;
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
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
    },
}, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

Group.hasOne(Local, { foreignKey: 'groups_id', as: 'local' });
Group.hasMany(Invitation, { foreignKey: 'groups_id' });

export { Group };
