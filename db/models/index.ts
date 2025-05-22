import { initUserModel, User } from './user.model';
import { initCardModel, Card } from './card.model';
import { initCompanyModel, Company } from './company.model';
import { initInvoiceModel, Invoice } from './invoice.model';
import { Transaction, initTransactionModel } from './transaction.model';
import { sequelize } from '../db';

initUserModel(sequelize);
initCardModel(sequelize);
initCompanyModel(sequelize);
initInvoiceModel(sequelize);
initTransactionModel(sequelize);

User.hasMany(Company, {
  foreignKey: 'userId',
  as: 'companies',
});

Company.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner',
});
// Company → Card (1:1)
Company.hasOne(Card, { foreignKey: 'companyId' });
Card.belongsTo(Company, { foreignKey: 'companyId' });

// Card → Invoice (1:N)
Card.hasMany(Invoice, { foreignKey: 'cardId' });
Invoice.belongsTo(Card, { foreignKey: 'cardId' });

// Card → Transaction (1:N)
Card.hasMany(Transaction, { foreignKey: 'cardId' });
Transaction.belongsTo(Card, { foreignKey: 'cardId' });

export { User, Company, Card, Invoice, Transaction };
