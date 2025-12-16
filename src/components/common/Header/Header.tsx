'use client';

import { Box, Typography } from '@mui/material';

import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { LogoIcon } from '@/assets/icons';
import { COMPANY } from '@/config/app.settings';

import classes from './header.module.css';

const LazyThemeToggle = dynamic(
  () => import('../ThemeToggle').then((module) => ({ default: module.ThemeToggle })),
  {
    loading: () => <Box sx={{ width: '72px' }} />,
    ssr: false,
  }
);

type HeaderPropsTypes = {
  variant?: 'default' | 'user' | 'admin';
};

export const Header: NextPage<HeaderPropsTypes> = (props) => {
  const { variant = 'default' } = props;

  return (
    <Box className={classes.wrapper}>
      <header className={classes.header_wrapper}>
        <Box className={classes.logo_wrapper}>
          <Image src={LogoIcon} width={28} height={28} alt="ImageLogo" />
          <Typography>{COMPANY.name}</Typography>
        </Box>
        {variant !== 'default' && (
          <Box className={classes.navigation_wrapper}>
            <Typography>Nav Links: {variant}</Typography>
          </Box>
        )}
        <Box className={classes.settings_wrapper}>
          <LazyThemeToggle />
        </Box>
      </header>
    </Box>
  );
};
