// app/layout.js
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}