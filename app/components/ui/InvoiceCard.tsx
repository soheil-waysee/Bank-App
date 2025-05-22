'use client';

import { Box, Divider, IconButton, Paper, Typography, Card, CardContent } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import { Card as CardType } from '@/app/types/card';

type CompanySelectProps = {
  card: CardType;
};

export function InvoiceCard({ card }: CompanySelectProps) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography variant="subtitle1">Invoice due</Typography>
        <IconButton size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Card
        sx={{
          position: 'relative',
          height: 200,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <Image src="/card.jpg" alt="Bank Card" fill style={{ objectFit: 'cover' }} priority />
        </Box>

        <CardContent
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            color: '#fff',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            **** **** **** {card?.number}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
