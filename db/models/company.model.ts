import { Model, DataTypes, Sequelize } from 'sequelize';

export class Company extends Model {
  declare id: number;
  declare name: string;
  declare orgNumber: string;
}

export const initCompanyModel = (sequelize: Sequelize) => {
  Company.init(
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
      orgNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      tableName: 'companies',
      modelName: 'Company',
      defaultScope: {
        attributes: { exclude: ['userId'] },
      },
    }
  );
};
