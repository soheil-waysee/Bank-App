import { Model, DataTypes, Sequelize } from 'sequelize';

export class Transaction extends Model {
  declare id: number;
  declare cardId: number;
  declare description: string;
  declare value: number;
  declare currency: string;
  declare date: Date;
}

export const initTransactionModel = (sequelize: Sequelize) => {
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.ENUM('SEK', 'USD', 'EUR'),
        defaultValue: 'SEK',
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'transactions',
      modelName: 'Transaction',
      defaultScope: {
        attributes: { exclude: ['cardId'] },
      },
    }
  );
};
