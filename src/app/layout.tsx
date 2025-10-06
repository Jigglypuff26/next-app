import type { Metadata } from 'next';
import clsx from 'clsx';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { themsList } from '@/constarts/theme';

import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: {
    template: '%s - Next-app', // title страницы если заходми на другую страницу
    default: 'Next-app По умолчанию' // title страницы если заходим на коерневую страницу
  },
  description: 'Описание',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={clsx(roboto.variable, 'antialiased')}
      >
        <AppRouterCacheProvider>
          <ThemeProvider
            themes={themsList}
            defaultTheme="light"
          >
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
