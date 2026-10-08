import './globals.css';

export const metadata = {
  title: 'Huntboard — Land your next role',
  description:
    'Huntboard uses AI to automatically track your job hunt — Gmail, Google Calendar, and screenshot detection log every application for you. Free to start, built for Indonesian job seekers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
