import { Box } from '@mui/material';
import { Metadata } from 'next';

import { Header } from '@/components/common/Header';

export const metadata: Metadata = {
  title: 'AdminPages',
  description: 'AdminPagesLayout Описание',
};

const AdminPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box>
      <Header variant='admin'/>
        {children}
    </Box>
  );
}

export default AdminPagesLayout;
