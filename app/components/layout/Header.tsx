import Image from 'next/image';
import Link from 'next/link';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1.5}
      boxShadow={1}
      bgcolor="background.paper"
      position="sticky"
      top={0}
      zIndex={1100}
    >
      <Link href="/" passHref>
        <Image src="/logo.jpg" alt="Company Logo" width={60} height={60} priority />
      </Link>
      <IconButton edge="end" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Box>
  );
}
