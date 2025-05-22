'use client';

import { Box, IconButton, Paper, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@/app/types/card';

type RemainingSpendCardProps = {
  card: Card;
};
export function RemainingSpendCard({ card }: RemainingSpendCardProps) {
  const { used, limit } = card;

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Remaining spend
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          {used.toLocaleString('sv-SE')} / {limit.toLocaleString('sv-SE')} kr
        </Typography>
        <IconButton size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="caption" color="text.secondary">
        based on your set limit
      </Typography>
    </Paper>
  );
}
