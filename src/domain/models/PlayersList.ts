import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/index';
import { User } from './UserModel';
import { List } from './ListModel';

interface PlayersListAttributes {
    id: number;
    lists_id: number;
    players_id: number;
    player_status: string;
    created_at: Date;
    updated_at: Date;
}

type PlayersListCreationAttributes = Omit<PlayersListAttributes, 'id' | 'created_at' | 'updated_at'>;

class PlayersList extends Model<PlayersListAttributes, PlayersListCreationAttributes> implements PlayersListAttributes {
    public id!: number;
    public lists_id!: number;
    public players_id!: number;
    public player_status!: string;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PlayersList.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    lists_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: List,
            key: 'id',
        }
    },
    players_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    player_status: {
        type: DataTypes.STRING(100),
        allowNull: false,

    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'players_list',
    modelName: 'PlayersList',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export { PlayersList };