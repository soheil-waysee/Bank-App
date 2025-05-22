import { Model, DataTypes, Sequelize } from 'sequelize';

export class Invoice extends Model {
  declare id: number;
  declare cardId: number;
  declare dueDate: Date;
  declare amount: number;
  declare status: 'unpaid' | 'paid' | 'overdue';
}

export const initInvoiceModel = (sequelize: Sequelize) => {
  Invoice.init(
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
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('unpaid', 'paid', 'overdue'),
        defaultValue: 'unpaid',
      },
    },
    {
      sequelize,
      tableName: 'invoices',
      modelName: 'Invoice',
      defaultScope: {
        attributes: { exclude: ['cardId'] },
      },
    }
  );
};
