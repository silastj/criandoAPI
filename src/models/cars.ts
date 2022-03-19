import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface CarsInstance extends Model {
    id: number;
    carro: string;
    marca: string;
}

export const Cars = sequelize.define<CarsInstance>('Cars', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    carro: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'carros',
    timestamps: false
})