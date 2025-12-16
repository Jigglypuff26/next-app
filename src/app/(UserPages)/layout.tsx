import { Box } from '@mui/material';
import { Metadata } from 'next';

import { Header } from '@/components/common/Header';

export const metadata: Metadata = {
  title: 'UserPages',
  description: 'UserPagesLayout Описание',
};

const AdminPagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box>
      <Header variant="user" />
      {children}
    </Box>
  );
};

export default AdminPagesLayout;
