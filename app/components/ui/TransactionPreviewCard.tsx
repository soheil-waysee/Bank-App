'use client';

import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export type Transaction = {
  id: number;
  description: string;
  value: string;
  date: string;
  currency: string;
};
export type TransactionPreviewCardProps = {
  transactions: Transaction[];
  transactionCount: number;
};
export function TransactionPreviewCard({
  transactions,
  transactionCount,
}: TransactionPreviewCardProps) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Latest transactions
        </Typography>

        <List disablePadding>
          {transactions.map(({ id, value, currency, description, date }) => (
            <ListItem
              key={id}
              disableGutters
              secondaryAction={
                <Typography variant="body2" color="text.secondary">
                  {value} {currency}
                </Typography>
              }
            >
              <ListItemText
                primary={description}
                secondary={new Date(date).toLocaleDateString('sv-SE', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              />
            </ListItem>
          ))}
        </List>

        <Box mt={2}>
          <Button endIcon={<ArrowForwardIosIcon fontSize="small" />} fullWidth variant="outlined">
            {transactionCount} more items in transaction view
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
