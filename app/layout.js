import './globals.css';

export const metadata = {
  title: 'Job Application Tracker',
  description: 'Track job applications: log them, move them through statuses, filter and search.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
