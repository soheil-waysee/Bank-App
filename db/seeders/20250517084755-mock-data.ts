import { QueryInterface } from 'sequelize';
import { Card, Company } from '../models';

export function getDigit(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    await queryInterface.bulkInsert('companies', [
      {
        name: 'Company AB',
        orgNumber: '556677-8899',
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: 'Company CD',
        userId: 1,
        orgNumber: '556688-9900',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);

    const [companyRows] = await queryInterface.sequelize.query(
      `SELECT id FROM companies ORDER BY id ASC LIMIT 2;`
    );
    const companiesResult = companyRows as Company[];

    for (const { id } of companiesResult) {
      await queryInterface.bulkInsert('cards', [
        {
          companyId: id,
          number: getDigit(10),
          status: 'active',
          limit: 10000,
          used: 5400,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      const [cardRow] = await queryInterface.sequelize.query(
        `SELECT id FROM "cards" WHERE "companyId" = ${id} LIMIT 1;`
      );
      const card = cardRow[0] as Card;
      await queryInterface.bulkInsert('invoices', [
        {
          cardId: card.id,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          amount: 3200,
          status: 'unpaid',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      await queryInterface.bulkInsert(
        'transactions',
        Array.from({ length: (id + 1) * 30 }, (_, i) => {
          return {
            cardId: card.id,
            description: 'Amazon Web Services' + i,
            value: Math.floor(Math.random() * (600 - -600 + 1)) + -600,
            currency: 'SEK',
            date: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('transactions', {}, {});
    await queryInterface.bulkDelete('invoices', {}, {});
    await queryInterface.bulkDelete('cards', {}, {});
    await queryInterface.bulkDelete('companies', {}, {});
    await queryInterface.bulkDelete('users', {}, {});
  },
};
