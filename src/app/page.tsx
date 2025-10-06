import { Header } from '@/components/common';
import {
  Box,
  Button,
  Typography
} from '@mui/material';

export default function Home() {
  return (
    <>
      <Header/>
      <div>
        <Box>
          <Typography variant='h2'>
            h1. Heading
          </Typography>
        </Box>
        <Button variant='contained'>Text</Button>
      </div>
    </>
  );
}
