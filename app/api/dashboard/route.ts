import { NextRequest, NextResponse } from 'next/server';
import { User, Company, Card, Invoice, Transaction } from '@/db/models';

export async function GET(req: NextRequest) {
  const userId = 1;

  const { searchParams } = new URL(req.url);
  const companyIdParam = searchParams.get('companyId');
  const requestedCompanyId = companyIdParam && parseInt(companyIdParam, 10);

  const user = await User.findByPk(userId, {
    include: {
      model: Company,
      as: 'companies',
    },
  });

  if (!user?.companies?.length) {
    return NextResponse.json({ error: 'No companies found for user' }, { status: 404 });
  }

  const activeCompany = user.companies.find(c => c.id === requestedCompanyId) || user.companies[0];

  const card = await Card.findOne({
    where: { companyId: activeCompany.id },
  });
  if (!card) {
    return NextResponse.json({ error: 'Card not found for company' }, { status: 404 });
  }

  const invoices = await Invoice.findAll({ where: { cardId: card.id } });
  const transactions = await Transaction.findAll({
    where: { cardId: card.id },
    limit: 3,
    order: [['date', 'DESC']],
  });

  const transactionCount = await Transaction.count({ where: { cardId: card.id } });

  return NextResponse.json({
    companies: user.companies,
    card,
    invoices,
    transactions,
    transactionCount,
  });
}
