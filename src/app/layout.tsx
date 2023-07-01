// import './globals.css';
import { Roboto_Mono } from 'next/font/google';

export const ROBOTO_MONO = Roboto_Mono({ subsets: ['latin'], display: 'swap' });

import clsx from 'clsx';
import './globals.css';
import localFont from 'next/font/local';

export const CHILLER_FONT = localFont({
  src: './chiller.ttf',
  display: 'swap'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          CHILLER_FONT.className,
          'flex min-h-screen items-center justify-center'
        )}
      >
        {children}
      </body>
    </html>
  );
}
