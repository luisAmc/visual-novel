// import './globals.css';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang='en'>
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

import clsx from 'clsx';
import './globals.css';
import localFont from 'next/font/local';

const chillerFont = localFont({
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
          chillerFont.className,
          'flex min-h-screen items-center justify-center'
        )}
      >
        {children}
      </body>
    </html>
  );
}
