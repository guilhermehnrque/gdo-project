import { DataTypes, Model } from 'sequelize';
import sequelize from '../../infrastructure/database/index'; 
import Group from './GroupModel'; 

interface LocalAttributes {
    id?: number;
    country: string;
    state: string;
    city: string;
    street: string;
    zip_code: number;
    number?: number;
    description: string;
    groups_id: number;
    created_at: Date;
    updated_at?: Date;
}

class Local extends Model<LocalAttributes> implements LocalAttributes {
    public id!: number;
    public country!: string;
    public state!: string;
    public city!: string;
    public street!: string;
    public zip_code!: number;
    public number?: number;
    public description!: string;
    public groups_id!: number;
    public created_at!: Date;
    public updated_at?: Date;
}

Local.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    description: {
        type: DataTypes.STRING(255),
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
    modelName: 'Local',
    tableName: 'locals',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


Local.belongsTo(Group, { foreignKey: 'groups_id' });

export default Local;
