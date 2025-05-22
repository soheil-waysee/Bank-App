'use client';

import { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/services/dashboard';
import { Box, Button, Container } from '@mui/material';
import { CompanySelect } from '../components/forms/CompanySelect';
import { InvoiceCard } from '../components/ui/InvoiceCard';
import { RemainingSpendCard } from '../components/ui/RemainingSpendCard';
import { TransactionPreviewCard } from '../components/ui/TransactionPreviewCard';

export default function DashboardContent() {
  const [companyId, setCompanyId] = useState<string | undefined>();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    fetchDashboardData(companyId).then(setData);
  }, [companyId]);

  if (!data) return <p>Loading...</p>;

  const { transactions, transactionCount, card, companies } = data;

  return (
    <Container maxWidth="sm">
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        <CompanySelect companies={companies} selectedId={companyId} onChange={setCompanyId} />
        <InvoiceCard card={card} />
        <RemainingSpendCard card={card} />
        <TransactionPreviewCard transactions={transactions} transactionCount={transactionCount} />
        <Button variant="contained" color="primary" fullWidth>
          Activate card
        </Button>
        <Button variant="outlined" fullWidth>
          Contact Qred’s support
        </Button>
      </Box>
    </Container>
  );
}
