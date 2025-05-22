import { Model, DataTypes, Sequelize } from 'sequelize';

export class Card extends Model {
  declare id: number;
  declare companyId: number;
  declare number: string;
  declare status: 'active' | 'inactive';
  declare limit: number;
  declare used: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const initCardModel = (sequelize: Sequelize) => {
  Card.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 19],
        },
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'inactive',
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      tableName: 'cards',
      modelName: 'Card',
      timestamps: true,
    }
  );

  Card.prototype.toJSON = function () {
    const values = { ...this.get() };
    if (values.number) {
      values.number = values.number.slice(-4);
    }
    return values;
  };
};
