import { Model, DataTypes, Sequelize } from 'sequelize';
import { Company } from './company.model';

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare companies?: Company[];
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      defaultScope: {
        attributes: { exclude: ['email'] },
      },
    }
  );
};
